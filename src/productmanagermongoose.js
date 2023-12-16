import { dbProductos } from "./models/productosmongoose.js";
import {randomUUID} from "crypto"

export class ProductManager {
     async addProduct(datosProductos){
        
            
                    datosProductos._id = randomUUID ()
                    const producto = await dbProductos.create(datosProductos)
                    return producto.toObject()
                }
    
    async getAll(){
       return await dbProductos.find().lean()
    }

    async paginado(criterio, paginacion){ 
        const result= await dbProductos.paginate(criterio, paginacion)
        const context = {
            status: "success",
            hayDocs: result.docs.length > 0,
            payload: result.docs,
            page: result.page,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            nextPage: result.nextPage,
            hasPrevPage: result.hasPrevPage,
            prevPage: result.prevPage,
            prevLink: "",
            nextLink: "",
        }
        return context
    
    }

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