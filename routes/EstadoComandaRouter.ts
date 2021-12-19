import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getEstadosComanda, 
  getEstadoComanda, 
  addEstadoComanda, 
  updateEstadoComanda, 
  deleteEstadoComanda
} from "../controllers/EstadoComandaController.ts";

const estadoComandaRouter = new Router();

estadoComandaRouter
.get("/api/estado_comanda", getEstadosComanda)
.get("/api/estado_comanda/:id", getEstadoComanda)
.post("/api/estado_comanda", addEstadoComanda)
.put("/api/estado_comanda/:id", updateEstadoComanda)
.delete("/api/estado_comanda/:id", deleteEstadoComanda);

export default estadoComandaRouter;
