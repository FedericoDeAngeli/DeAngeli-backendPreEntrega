import { Router, urlencoded,json } from "express";
import {productManager} from "../productmanagermongoose.js"

export const productRouterMongoose = Router();

productRouterMongoose.use(json())

productRouterMongoose.get("/", async (req, res) => {
    const producto = productManager.getAll()
    res.json(producto)

    // const result = await productManager.paginapdo(criterio, paginacion)
    

    // res.json(result)
    
   
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