import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getMediosDePago, 
  getMedioDePago, 
  addMedioDePago, 
  updateMedioDePago, 
  deleteMedioDePago
} from "../controllers/MedioDePagoController.ts";

const medioDePagoRouter = new Router();

medioDePagoRouter
.get("/api/medio_de_pago", getMediosDePago)
.get("/api/medio_de_pago/:id", getMedioDePago)
.post("/api/medio_de_pago", addMedioDePago)
.put("/api/medio_de_pago/:id", updateMedioDePago)
.delete("/api/medio_de_pago/:id", deleteMedioDePago);

export default medioDePagoRouter;
