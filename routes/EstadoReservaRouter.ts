import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getEstadosReserva, 
  getEstadoReserva, 
  addEstadoReserva, 
  updateEstadoReserva, 
  deleteEstadoReserva
} from "../controllers/EstadoReservaController.ts";

const estadoReservaRouter = new Router();

estadoReservaRouter
.get("/api/estado_reserva", getEstadosReserva)
.get("/api/estado_reserva/:id", getEstadoReserva)
.post("/api/estado_reserva", addEstadoReserva)
.put("/api/estado_reserva/:id", updateEstadoReserva)
.delete("/api/estado_reserva/:id", deleteEstadoReserva);

export default estadoReservaRouter;
