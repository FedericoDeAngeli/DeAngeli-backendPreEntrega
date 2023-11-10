import fs from "fs/promises"
import { Product } from "./Product.js"




export class productManager {
    static productsId = 0
    
    constructor({ruta}){
    this.path = ruta
    this.products = []
    }
    async init(){
        await this.writeProduct()
    }
    
     static generarId(){
      return  ++productManager.productsId
    }
    
    async readProduct(){
        try {
            const productJSON = await fs.readFile(this.path, "utf-8")
            this.products = JSON.parse(productJSON)
        } catch (error) {
            console.log(error.message)
        }
      
    }
    
    async writeProduct(){
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2)) 
        } catch (error) {
            console.log(error.message)
        }
       
    }
    
    
    async updateProduct(id, {title, description, price, thumbnail, code, stock, status, category}){
        try {
            await this.readProduct()
        const index = this.products.findIndex((e)=> e.id === id)
        if(index !== -1){
            this.products[index] = new Product({
            title, description, price, thumbnail, code, stock, status, category})
            
            await this.writeProduct()
            return this.products
             
        }else{
            console.log("Producto no encontrado")
        }
        } catch (error) {
            console.log(error.message)
        }
        
    }

    async  updProduct(id, {title, description, price, code, thumbnail, stock, status, category}){
        await this.readProduct()
        if(id >0 && id <= this.products.length){
        const index = this.products.findIndex((e)=> e.id === id)
        if(index){
            this.products[index] = new Product({
            id, title, description, price, thumbnail, code, stock, status, category})
            await this.writeProduct()
            return this.products
        }else{ throw new Error("No se puede actualizar el producto")}
    }else{ throw new Error("Id incorrecto")}
}
    
    async deleteProduct(id){
        try {
            const index = this.products.findIndex((e)=> e.id === id)
      if(index !== -1){
        await this.readProduct()
        this.products.splice(index, 1)
          await this.writeProduct()
          return this.products
       }
        } catch (error) {
            console.log(error.message)
        }
       
     }
  async   dltProduct(id) {
        const index = this.products.findIndex((e)=> e.id === id)
        await this.readProduct()
        this.products.splice(index, 1)
        await this.writeProduct()
          return this.products

    }
    
    
    async getProducts(){
        try {
            await this.readProduct()
            return this.products
        } catch (error) {
            console.log(error.message)
        }
       
    }


    
    async addProduct({title, description, price, code, thumbnail, stock, status, category}) {
        try {
            if(!title || !description || !price || !code || !thumbnail || !stock || !status || !category){
                console.log("Es obligatorio llenar todos los campos")
            }else{
                if(this.products.find((e)=> e.code === code)){
                    console.log("Producto ya agregado")
                }else{
            
            const id = productManager.generarId();
            const product = new Product({id, title, description, price,code, thumbnail, code, stock, status, category})
            await this.readProduct()
            this.products.push(product)
            await this.writeProduct()
            return product
        }
        }
        } catch (error) {
            console.log(error.message)
        }
       
    }
    
    
     getProductsById(id){
        try {
            const productId =  this.products.find((e) => e.id === id)
            if(!productId){
                console.log("Error al traer el producto")
            }else{
                return productId
            }
        } catch (error) {
            console.log(error.message)
        }
       
    }

   async getById(id){
    const productByIdJSON = await fs.readFile(this.path, "utf-8")
    const productById = JSON.parse(productByIdJSON)
    const productFind = productById.find((e) => e.id === id)
    if(!productFind){
        throw new Error ("Producto no encontrado")
    }else{
        return productFind
    }
    }
    
    async getAll (){
        const productJSON = await fs.readFile(this.path, "utf-8")
return JSON.parse(productJSON)
    
}

  
   

    }
    

    

const pm = new productManager({ruta: "productManager.json"})
// pm.init()

// const p1 = await pm.addProduct ({title: "Curcuma",description: "Adobo", price: "150", code:"1", thumbnail: "img1", stock: "20"})
// const p2 = await pm.addProduct ({title: "pimienta", description: "Molida", price: "250", code:"2",thumbnail: "img2", stock: "10"})   
// const p3 = await pm.addProduct ({title: "Azafrán",description: "Egipcio", price: "1200", code:"3",thumbnail: "img3", stock: "5"})
// const p4 = await pm.addProduct ({title: "Pimentón",description: "Español", price: "300", code:"4",thumbnail: "img4", stock: "22"})
// const p5 = await pm.addProduct ({title: "Cereal",description: "Ositos", price: "700", code:"5",thumbnail: "img6", stock: "18"})
// const p6 = await pm.addProduct ({title: "Orégano",description: "Especial", price: "410", code:"6",thumbnail: "img6", stock: "32"})
// const p7 = await pm.addProduct ({title: "Comino",description: "Especial", price: "780", code:"7",thumbnail: "img7", stock: "32"})
// const p8 = await pm.addProduct ({title: "Cayote",description: "Rico", price: "230", code:"8",thumbnail: "img8", stock: "40"})
// const p9 = await pm.addProduct ({title: "Perrito",description: "Balanceado", price: "1500", code:"9",thumbnail: "img9", stock: "55"})
// const p10 = await pm.addProduct ({title: "Golosina",description: "Gallina", price: "440", code:"10",thumbnail: "img10", stock: "20"})