export class Product {
    id
    title
    description
    price
    thumbnail
    code
    stock
    status
    category
    
    constructor({id,title, description, price, thumbnail, code, stock, status, category}){
        this.id = id,
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
        this.status = status
        this.category = category
    }
    }