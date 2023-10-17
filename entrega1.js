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

products = []

static generarId(){
    return ++productManager.productsId
}

getProducts(){
    return this.products
}

addProduct({title, description, price, code, thumbnail, stock}){
    if(!title || !description || !price || !code || !thumbnail || !stock){
        console.log("Es obligatorio llenar todos los campos")
    }else{
        if(this.products.find((e)=> e.code === code)){
            console.log("Producto ya agregado")
        }else{
    
    const id = productManager.generarId();
    const product = new Product({id, title, description, price,code, thumbnail, code, stock})
    this.products.push(product)
    return product
}
}
}


getProductsById(id){
    const productId = this.products.find((e) => e.id === id)
    if(!productId){
        console.log("Error al traer el producto")
    }else{
        return productId
    }
}
}

const pm = new productManager()

console.log(pm.getProducts())

const p1 = pm.addProduct ({title: "Curcuma",description: "Adobo", price: "150", code:"1", thumbnail: "img1", stock: "20"})
const p2 = pm.addProduct ({description: "Molida", price: "250", code:"2",thumbnail: "img2", stock: "10"})   
const p3 = pm.addProduct ({title: "Azafrán",description: "Egipcio", price: "1200", code:"1",thumbnail: "img3", stock: "5"})
const p4 = pm.addProduct ({title: "Pimentón",description: "Español", price: "300", code:"4",thumbnail: "img4", stock: "22"})


console.log(pm.getProducts())

const productFound = pm.getProductsById(1)

console.log(productFound)

const productNotFound = pm.getProductsById(5)

console.log(productNotFound)

