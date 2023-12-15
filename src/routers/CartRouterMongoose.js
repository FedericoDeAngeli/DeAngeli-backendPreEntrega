import { Router, urlencoded,json } from "express";
import { cartManagerMongoose } from "../cartmanagermongoose.js";

export const cartRouterMongoose = Router()

cartRouterMongoose.get("/", async (req, res) => {
    const carritos = await cartManagerMongoose.getAllCart()
    res.json({carritos})})

cartRouterMongoose.get("/:id", async (req, res) =>{
    const id = req.params.id
    try { 
        const carritos = await cartManagerMongoose.getCartById(id)
        res.json(carritos)  
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
})

cartRouterMongoose.post("/", async (req, res) => {
    const datosCart = req.body
    const cartAgregado = await cartManagerMongoose.addCart(datosCart)
    res.json(cartAgregado)
})

cartRouterMongoose.post("/:id/product/:pid", async (req,res)=>{
    const pId = req.params.pid
    const id = req.params.id
    try {
        await cartManagerMongoose.addNewProduct(id, pId)
        res.json({status: "ok"})
       
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
})

cartRouterMongoose.delete("/:id/product/:pid", async (req, res) => {
    const pid = req.params.pid
    const id=req.params.id
    try {
    await cartManagerMongoose.deleteProduct(id, pid)
    res.json({status: "ok"})
} catch (error) {
    res.json({
        status: "error",
        message: error.message})
}})

cartRouterMongoose.delete("/:id", async (req, res) => {
    const id = req.params.id
   try {
    if(!id){
        throw new Error ("Carrito no encontrado")
    }else{
        const borrado = await cartManagerMongoose.deleteCart(id)
        res.json({status: "ok"})
    }
   } catch (error) {
    res.json({status: "error", message: error.message})
   }
    
    
})

cartRouterMongoose.put("/:id", async (req, res) => {
    const nuevoProducto = req.body
    await cartManagerMongoose.updateProduct(id, 
        {$push: nuevoProducto},
        {new: true}).lean()
    })


cartRouterMongoose.put("/:id/product/:pId", async (req, res) => {
    const quantity = req.body

})


