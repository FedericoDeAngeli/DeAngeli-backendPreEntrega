import { Router } from "express";
import { CartManager } from "./CartManager.js";


const cm = new CartManager({ruta: "carrito.json"})
export const cartRouter = Router()

cartRouter.get("/", async (req,res)=>{
    const carritos = await cm.getAllCart()
    res.json({carritos})
})

cartRouter.get("/:id", async (req,res)=>{
    const id = parseInt(req.params.id)
    try { 
        const carritos = await cm.getCartById(id)
        res.json(carritos)  
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
})

cartRouter.post("/", (req,res)=>{
    const datosCart = req.body
    const cartAgregado = cm.addCart(datosCart)
    res.json(cartAgregado)
})

cartRouter.post("/:id/product/:pid", async (req,res)=>{
    const pId = parseInt (req.params["pid"])
    const id = parseInt(req.params["id"])
    try {
        await cm.addNewProduct(id, pId)
       
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
   
   
   

})