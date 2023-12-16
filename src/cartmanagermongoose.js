import {dbCart} from "./models/cartmongoose.js"
import {randomUUID} from "crypto"

export class CartManager{
    async addCart(){
        const _id = randomUUID()
        const cart = await dbCart.create({_id})
                    return cart.toObject()
    }

    async getAllCart(){
        return await dbCart.find().populate("product.pid").lean()
     }

     async getCartById(id){
       
        const CartFind = await dbCart.findById(id).populate("product.pid").lean()
        
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


async deleteProduct(id, pid){
    const idCart = await dbCart.findById(id)
    if(!idCart){
        throw new Error("Carrito no encontrado")
    }else{
      const  idProduct = idCart.product.find(product => product.pid === pid)
        if(!idProduct){
            throw new Error("Producto no encontrado")
        }else{
            await dbCart.findByIdAndUpdate(id,
                { $pull: { product: { pid: pid }}},
                { new: true }).lean()
        }
    }
    
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
    const cart = await dbCart.findByIdAndDelete(_id,).lean()

        return cart
}

}

export const cartManagerMongoose = new CartManager()