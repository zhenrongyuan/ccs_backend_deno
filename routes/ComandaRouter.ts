import { Router } from "https://deno.land/x/oak/mod.ts";
import {addComanda, getComandas, getComanda, updateComanda, deleteComanda,
} from "../controllers/ComandaController.ts";

const comandaRouter = new Router();

comandaRouter
  .get("/api/comanda", getComandas)
  .get("/api/comanda/:id", getComanda)
  .post("/api/comanda", addComanda)
  .put("/api/comanda/:id", updateComanda)
  .delete("/api/comanda/:id", deleteComanda);

export default comandaRouter;
