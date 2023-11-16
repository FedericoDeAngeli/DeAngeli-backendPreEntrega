import { Router } from "express";

export const webRouter = Router();

webRouter.get("/", (req, res) => {
  res.render("home", {titulo: "Home"} );
});

webRouter.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", {titulo: "Real Time Products"} );
});