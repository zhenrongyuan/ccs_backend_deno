import { Router } from "https://deno.land/x/oak/mod.ts";
import {addReserva, getReservas, getReserva, updateReserva, deleteReserva,
} from "../controllers/ReservaController.ts";

const reservaRouter = new Router();

reservaRouter
  .get("/api/reserva", getReservas)
  .get("/api/reserva/:id", getReserva)
  .post("/api/reserva", addReserva)
  .put("/api/reserva/:id", updateReserva)
  .delete("/api/reserva/:id", deleteReserva);

export default reservaRouter;
