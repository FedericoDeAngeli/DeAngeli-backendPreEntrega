import fs from "fs/promises"
import { Cart } from "./Cart.js"


export class CartManager {
    static cartId = 0

    constructor({ ruta }) {
        this.path = ruta
        this.carts = []
    }

    async init() {
        await this.writeCart()
    }

    static generarId(){
        return  ++CartManager.cartId
      }

      async readCart(){
        try {
            const cartJSON = await fs.readFile(this.path, "utf-8")
            this.carts = JSON.parse(cartJSON)
        } catch (error) {
            console.log(error.message)
        }
      
    }
    
    async writeCart(){
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2)) 
        } catch (error) {
            console.log(error.message)
        }
       
    }

    async addCart(){
        const id = CartManager.generarId()
        const newCart = {id:id, product:[]}
        this.carts = await this.getAllCart()
        this.carts.push(newCart)
        await this.writeCart()
        return newCart
    }

    async addNewProduct(id, pId){
       const carts = await this.getAllCart()
        const index = carts.findIndex((e)=> e.id === id)
        if(index !== -1){
            const productInCart = await this.getCartById(id)
            const productoPorAgregar = productInCart.product.findIndex((product)=> product.pId  === pId)

            if(productoPorAgregar !== -1){
                productInCart.product[productoPorAgregar].quantity = productInCart.product[productoPorAgregar].quantity + 1
        }else{
            productInCart.product.push({pId, quantity:1})
         
        }
        this.carts[index].product =productInCart 
    
        await this.writeCart()
        console.log("Producto agregado")
    }else{
        console.log("Carrito no encontrado")
    }

}




    async getAllCart (){
        const CartJSON = await fs.readFile(this.path, "utf-8")
        return JSON.parse(CartJSON)
    
}

async getCartById(id){
    const CartByIdJSON = await fs.readFile(this.path, "utf-8")
    const CartById = JSON.parse(CartByIdJSON)
    const CartFind = CartById.find((e) => e.id === id)
    if(!CartFind){
        throw new Error ("Carrito no encontrado")
    }else{
        return CartFind
    }
    }
}


