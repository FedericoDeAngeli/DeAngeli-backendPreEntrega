import {Schema, model} from "mongoose"

export const ProductSchema = new Schema({
    _id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required:true},
    code: {type: String, unique: true, required: true},
    stock: {type: Number, },
    status: {type: String, },
    category: {type: String, required: true},
},{
    strict: "throw",
    versionKey: false,
    statics: {},
    methods: {},
})

export const dbProductos = model("productos", ProductSchema)
 
