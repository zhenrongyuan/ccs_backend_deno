import { Router } from "https://deno.land/x/oak/mod.ts";
import { getComandaCalculada } from "../controllers/CuentaController.ts";

const cuentaRouter = new Router();

cuentaRouter
  .get("/api/cuenta/:id", getComandaCalculada);

export default cuentaRouter;
