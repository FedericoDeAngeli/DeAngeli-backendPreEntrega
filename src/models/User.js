import { Schema, model } from "mongoose";
import {randomUUID} from "crypto"

export const UserSchema = new Schema({
    _id: {type: String, default: randomUUID},
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true},
    age: { type: Number, required: true},
    password: { type: String, required: true}
},{
    strict: "throw",
    versionKey: false,
})

export const UserManager = model("usuarios", UserSchema)