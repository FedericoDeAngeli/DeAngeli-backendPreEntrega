import { Router } from "express";
export const webRouter = Router();
import { RealTimeProducts } from "../app.js";
import { dbProductos } from "../models/productosmongoose.js";
import { dbCart } from "../models/cartmongoose.js";





webRouter.get("/", async (req, res) => {
  const criterio = req.query || {}
  const paginacion = {
      limite: req.query.limit || 2,
      page: req.query.page || 1,
      sort: req.query.sort,
      lean: true
  }
  
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
      limit: result.limit,
      prevLink: "",
      nextLink: "",
  }

  res.render("index", context)
});

webRouter.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", {titulo: "Real Time Products"} );
});

webRouter.get("/productos",  async (req, res) => {
  const productos = await dbProductos.find().lean()
   res.render("productos", {productos} );
})

webRouter.get("/productos/:id", async (req, res) => {
const _id = req.params.id;
const producto = await dbProductos.findById(_id).lean()
res.render("productbyid", {producto})
})

webRouter.get("/cart/:cid", async (req, res) => {
  const cid = req.params.cid;
  const carrito = await dbCart.findById(cid).populate("product.pid", "title").lean();
   res.render("carts", {carrito})
})