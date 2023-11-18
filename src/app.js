import express from 'express';
import { productRouter } from './ProductRouter.js';
import { cartRouter } from './CartRouter.js';
import {engine} from "express-handlebars"
import { webRouter } from './webrouter.js';
import {Server as IOServer} from "socket.io"

 export const RealTimeProducts = []

const app = express();

app.engine("handlebars", engine())
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use("/api/productos", productRouter)
app.use("/api/cart", cartRouter)
app.use("/", webRouter)
app.use("/static", express.static("./static"))



const server = app.listen(8080, ()=>{
    console.log("Conectado al puerto 8080")
})

const ioServer = new IOServer(server)

ioServer.on("connection", socket => {
    console.log("Un cliente se ha conectado:", socket.id) 

    socket.on("productoAgregado", productos =>{
        RealTimeProducts.push(productos)
        ioServer.sockets.emit("agregarProducto", RealTimeProducts)
    })
})


