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
        const productInCart =  CartFind.product.find(product => product.pid === pid)
        if(!productInCart){
            await dbCart.findByIdAndUpdate(id,
                {$push: {product: {pid: pid, quantity: 1}}},
                {new: true}).lean()
        }else{
           const updateCart = await dbCart.findOneAndUpdate( 
            { _id: id, 'product.pid': pid },
           { $inc: { 'product.$.quantity': 1 } },
           { new: true }).lean()
           return   updateCart
        }
    }
    
}


async deleteProduct(pid){
    if(!pid){
        throw new Error("Carrito no encontrado")
    }
    const deleteProd = await dbCart.findByIdAndDelete(pid)
    return deleteProd
} 

async updateProductsInCart(_id, nuevosDatos){
    const newProduct = await dbCart.findByIdAndUpdate(_id,
        {$push: nuevosDatos},
        {new: true}).lean()  
        
        return newProduct
        }

async updateProduct(pid, quantity){
    const product = await dbCart.findByIdAndUpdate(pid,
        {},
        {new: true}
        )
        return product
}

async deleteCart(_id){
    const cart = await dbCart.findByIdAndUpdate(_id,
        {$push: []},
        {new: true})

        return cart
}

}

export const cartManagerMongoose = new CartManager()