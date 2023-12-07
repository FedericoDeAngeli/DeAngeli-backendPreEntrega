import {dbCart} from "./models/cartmongoose.js"
import {randomUUID} from "crypto"

export class CartManager{
    async addCart(){
        const _id = randomUUID()
        const cart = await dbCart.create({_id})
                    return cart.toObject()
    }

    async getAllCart(){
        return await dbCart.find().lean()
     }

     async getCartById(id){
       
        const CartFind = await dbCart.findById(id).lean()
        
        if(CartFind){
            return CartFind
        }else{
            throw new Error ("Carrito no encontrado")
        }
     }
 async addNewProduct(id, pid){
    const CartFind = await dbCart.findById(id)
    if (CartFind){
        const productInCart = await dbCart.findByIdAndUpdate(pid,
            {$set: quantity + 1},
            {new: true}).lean()

            if(productInCart){
                return productInCart
            }else{
                 const newProduct = await dbCart.create(pid, quantity = 1)
                 return newProduct
            }
        
    }else{
        throw new Error("Carrito no encontrado")
    }
 }

}

export const cartManagerMongoose = new CartManager()