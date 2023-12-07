import {Schema, model} from "mongoose"

export const CartSchema = new Schema({
    _id: {type: String, required: true},
    product: [{type: String}]
},{
    strict: "throw",
    versionKey: false,
    statics: {},    
    methods:{}
})

export const dbCart = model("cart", CartSchema)
    