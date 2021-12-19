import { Router } from "https://deno.land/x/oak/mod.ts";
import {addMesa, getMesas, getMesa, updateMesa, deleteMesa,
} from "../controllers/MesaController.ts";

const mesaRouter = new Router();

mesaRouter
  .get("/api/mesa", getMesas)
  .get("/api/mesa/:id", getMesa)
  .post("/api/mesa", addMesa)
  .put("/api/mesa/:id", updateMesa)
  .delete("/api/mesa/:id", deleteMesa);

export default mesaRouter;
