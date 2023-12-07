import { Router } from "express";
import { messageManager } from "../MessageManagerMongoose.js";

export const messageRouter = Router()

messageRouter.post("/", async (req, res) => {
    const mensaje = req.body
    const nuevoMensaje = await messageManager.addMessage(mensaje)
    res.json(nuevoMensaje)

})

messageRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    const mensajes = await messageManager.getMessage(id)
    res.json(mensajes)
})