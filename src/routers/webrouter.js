import { Router } from "express";
export const webRouter = Router();
import { RealTimeProducts } from "../app.js";




webRouter.get("/", (req, res) => {
  res.render("index", {titulo: "Productos"} );
});

webRouter.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", {titulo: "Real Time Products"} );
});

