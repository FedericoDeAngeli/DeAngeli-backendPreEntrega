import express from 'express';
import { productRouter } from './ProductRouter.js';
import { cartRouter } from './CartRouter.js';

const app = express();

app.use(express.json());
app.use("/api/productos", productRouter)
app.use("/api/cart", cartRouter)



app.listen(8080, ()=>{
    console.log("Conectado al puerto 8080")
})



