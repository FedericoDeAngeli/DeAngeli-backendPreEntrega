const {promises:fs} = require("fs")
const { title } = require("process")


class Product {
id
title
description
price
thumbnail
code
stock

constructor({title, description, price, thumbnail, code, stock}){
    this.id = productManager.productsId,
    this.title = title,
    this.description = description,
    this.price = price,
    this.thumbnail = thumbnail,
    this.code = code,
    this.stock = stock
}
}

class productManager {
static productsId = 0

constructor({ruta}){
this.path = ruta
this.products = []
}
async init(){
    await this.writeProduct()
}

static generarId(){
    return ++productManager.productsId
}

async readProduct(){
    const productJSON = await fs.readFile(this.path, "utf-8")
    this.products = JSON.parse(productJSON)
}

async writeProduct(){
    
    await fs.writeFile(this.path, JSON.stringify(this.products)) 
}catch(error){
    console.log(error.message)
}


async updateProduct(id, {title, description, price, thumbnail, code, stock}){
    await this.readProduct()
    const index = this.products.findIndex((e)=> e.id === id)
    if(index !== -1){
        this.products[index] = new Product({
        id, title, description, price, thumbnail, code, stock })
        
        await this.writeProduct()
        return this.products
         
    }else{
        console.log("Producto no encontrado")
    }
}

async deleteProduct(){
    const index = this.products.findIndex((e)=> e.id === id)
    if(index !== -1){
        await fs.unlink(this.path, index)
        return this.products
    }
}


async getProducts(){
    await this.readProduct()
    return this.products
}

async addProduct({title, description, price, code, thumbnail, stock}){
    if(!title || !description || !price || !code || !thumbnail || !stock){
        console.log("Es obligatorio llenar todos los campos")
    }else{
        if(this.products.find((e)=> e.code === code)){
            console.log("Producto ya agregado")
        }else{
    
    const id = productManager.generarId();
    const product = new Product({id, title, description, price,code, thumbnail, code, stock})
    await this.readProduct()
    this.products.push(product)
    await this.writeProduct()
    return product
}
}
}


 getProductsById(id){
    const productId =  this.products.find((e) => e.id === id)
    if(!productId){
        console.log("Error al traer el producto")
    }else{
        return productId
    }
}
}

async function main(){
const pm = new productManager({ruta: "productManager.json"})
pm.init()

console.log(pm.getProducts())

const p1 = await pm.addProduct ({title: "Curcuma",description: "Adobo", price: "150", code:"1", thumbnail: "img1", stock: "20"})
const p2 = await pm.addProduct ({description: "Molida", price: "250", code:"2",thumbnail: "img2", stock: "10"})   
const p3 = await pm.addProduct ({title: "Azafrán",description: "Egipcio", price: "1200", code:"1",thumbnail: "img3", stock: "5"})
const p4 = await pm.addProduct ({title: "Pimentón",description: "Español", price: "300", code:"4",thumbnail: "img4", stock: "22"})
const p5 = await pm.addProduct ({title: "Cereal",description: "Ositos", price: "700", code:"6",thumbnail: "img6", stock: "18"})
const p6 = await pm.addProduct ({title: "Orégano",description: "Especial", price: "410", code:"7",thumbnail: "img7", stock: "32"})


// console.log(pm.getProducts())

// const productFound = pm.getProductsById(1)

// console.log(productFound)

// const productNotFound = pm.getProductsById(12)

// console.log(productNotFound)

pm.updateProduct(3, {title:"Aji cayena",description: "picante", price: "450", thumbnail:"img5",code: "5", stock: "26"})
pm.deleteProduct(1)

 }

main()
