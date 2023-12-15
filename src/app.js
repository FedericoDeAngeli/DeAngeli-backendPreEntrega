import express from 'express';
import { productRouter } from './routers/ProductRouter.js';
import {productRouterMongoose} from './routers/ProductRouterMongoose.js';
import { cartRouter } from './routers/CartRouter.js';
import {cartRouterMongoose} from './routers/CartRouterMongoose.js';
import {engine} from "express-handlebars"
import { webRouter } from './routers/webrouter.js';
import {Server as IOServer} from "socket.io"
import mongoose from 'mongoose';
import{MONGODB_CNX_STRING} from "./config.js";
import { PORT } from './config.js';
import { ProductManager, productManager } from './productmanagermongoose.js';
import { messageRouter } from './routers/MessageRouterMongoose.js';
import { cartManagerMongoose } from './cartmanagermongoose.js';
import { dbCart } from './models/cartmongoose.js';


 export const RealTimeProducts = []
 
 await mongoose.connect(MONGODB_CNX_STRING)
 console.log("Conectado a base de datos")

const app = express();

app.engine("handlebars", engine())
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.json());
// app.use("/api/productos", productRouter)
app.use("/api/productos", productRouterMongoose)
// app.use("/api/cart", cartRouter)
app.use("/api/cart", cartRouterMongoose)
app.use("/api/message", messageRouter)
app.use("/", webRouter)
app.use("/static", express.static("./static"))



const server = app.listen(PORT, ()=>{
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


