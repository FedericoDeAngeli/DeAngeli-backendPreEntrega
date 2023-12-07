import { dbMessage } from "./models/MessageMongoose.js";
import {randomUUID} from "crypto"

export class MessageMongooseManager{
    async addMessage(Mensaje){    
        Mensaje._id= randomUUID();     
        const nuevoMensaje = await dbMessage.create(Mensaje)
        return nuevoMensaje.toObject()
    }

    async getMessage(id){
        const messages = await dbMessage.findById(id).lean()
        return messages
    }
}

export const messageManager = new MessageMongooseManager()