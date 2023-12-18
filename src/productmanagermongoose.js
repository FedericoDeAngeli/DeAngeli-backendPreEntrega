import { dbProductos } from "./models/productosmongoose.js";
import {randomUUID} from "crypto"

export class ProductManager {
     async addProduct(datosProductos){
        
            
                    datosProductos._id = randomUUID ()
                    const producto = await dbProductos.create(datosProductos)
                    return producto.toObject()
                }
    
    async getAll(){
       const productos= await dbProductos.find().lean()
       console.log(productos)
       return productos
    }

    // async paginado(criterio, paginacion){ 
       
        
    //     return context

    // }

    // async sort(order){
    //     if(order==="asc"){ dbProductos.aggregate([
    //    {$sort:{price: 1}}
    //     ])}else{
    //         if(order==="desc"){ dbProductos.aggregate([
    //             {$sort:{price:-1}}
    //         ])
    //     }
     
    // }}

    async getById(id){
        const buscada = await dbProductos.findById(id).lean()
        if(buscada){
            return buscada
        }else{
            throw new Error("Producto no encontrado")
        }
    }

    async deleteProducto(id){
        const borrada = await dbProductos.findByIdAndDelete(id).lean()
    if(borrada){
        return borrada
    }else{
        throw new Error("Producto no encontrado")
    }}

    async UpdateProducto(id, nuevosdatos){
        const modificado = await dbProductos.findByIdAndUpdate(id, 
            {$set: nuevosdatos},
            {new: true}).lean()

            if (modificado){
                return modificado
            }else{
                throw new Error ("Producto no encontrado")
            }
        }
                   
}

export const productManager = new ProductManager()