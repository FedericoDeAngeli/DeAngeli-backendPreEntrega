import { Router, urlencoded,json } from "express";
import {productManager} from "../productmanagermongoose.js"

export const productRouterMongoose = Router();

productRouterMongoose.use(json())

productRouterMongoose.get("/", async (req, res) => {
    try {
        const limit = req.query.limit
        if(!limit){
        const productos = await productManager.getAll()
        res.json({productos})
    }else{
        if(limit >0 && limit <=10){
            const productos = await productManager.getAll()
            res.json(productos.slice(0, limit))
        }else{
            throw new Error ("Valor de límite excedido")
        }
    }
      } catch (error) {
        res.json({
            status: "error",
            message: "No se agregaron productos"
        })
    }
})

productRouterMongoose.get("/:id", async (req, res) =>{
    const id = req.params.id
    try { 
        const productos = await productManager.getById(id)
        res.json(productos)  
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
})

productRouterMongoose.post("/", async (req, res) =>{
    const datosProductos = req.body
const productoAgregado = await productManager.addProduct(datosProductos)
res.json(productoAgregado)
})


productRouterMongoose.put("/:id", async (req, res) =>{
    const id = req.params.id
    const nuevoProducto = req.body
    const nuevoProductoAgregado = await productManager.UpdateProducto(id,nuevoProducto)
    res.json(nuevoProductoAgregado)
})

productRouterMongoose.delete("/:id", async (req, res) =>{
    const id = req.params.id
    const nuevoArreglo = await productManager.deleteProducto(id)
    res.json (nuevoArreglo)
})