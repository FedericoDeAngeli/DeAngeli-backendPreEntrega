export class Product {
    id
    title
    description
    price
    thumbnail
    code
    stock
    
    constructor({id,title, description, price, thumbnail, code, stock}){
        this.id = id,
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
    }
    }