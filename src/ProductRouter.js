import { Router } from "express";
import {productManager} from "./ProductManager.js"

const pm = new productManager({ruta: "productManager.json"})

export const productRouter = Router();

productRouter.get("/", async (req, res) => {
    try {
        const limit = req.query.limit
        if(!limit){
        const productos = await pm.getAll()
        res.json({productos})
    }else{
        if(limit >0 && limit <=10){
            const productos = await pm.getAll()
            res.json(productos.slice(0, limit))
        }else{
            throw new Error ("Valor de límite excedido")
        }
    }
      } catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }

})


productRouter.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try { 
        const productos = await pm.getById(id)
        res.json(productos)  
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
   
})

productRouter.post("/", (req, res) => {
    const datosProductos = req.body
    const productoAgregado = pm.addProduct(datosProductos)
    res.json(productoAgregado)
})



productRouter.put("/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    const nuevoProducto = req.body
    const nuevoProductoAgregado = pm.updProduct(id,nuevoProducto)
    res.json(nuevoProductoAgregado)
})

productRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const nuevoArreglo = pm.dltProduct(id)
    res.json (nuevoArreglo)
    
})