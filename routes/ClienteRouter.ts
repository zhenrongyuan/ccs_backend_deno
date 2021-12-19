import { Router } from "https://deno.land/x/oak/mod.ts";
import {addCliente, getClientes, getCliente, updateCliente, deleteCliente,
} from "../controllers/ClienteController.ts";

const clienteRouter = new Router();

clienteRouter
  .get("/api/cliente", getClientes)
  .get("/api/cliente/:id", getCliente)
  .post("/api/cliente", addCliente)
  .put("/api/cliente/:id", updateCliente)
  .delete("/api/cliente/:id", deleteCliente);

export default clienteRouter;
