import express from 'express';
import {productManager} from "./ProductManager.js"

const pm = new productManager({ruta: "productManager.json"})
const app = express();



app.listen(8080, ()=>{
    console.log("Conectado al puerto 8080")
})

app.get("/productos", async (req, res) => {
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

app.get("/productos/:id", async (req, res) => {
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
