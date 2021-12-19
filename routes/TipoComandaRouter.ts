import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getTiposComanda, 
  getTipoComanda, 
  addTipoComanda, 
  updateTipoComanda, 
  deleteTipoComanda
} from "../controllers/TipoComandaController.ts";

const tipoComandaRouter = new Router();

tipoComandaRouter
.get("/api/tipo_comanda", getTiposComanda)
.get("/api/tipo_comanda/:id", getTipoComanda)
.post("/api/tipo_comanda", addTipoComanda)
.put("/api/tipo_comanda/:id", updateTipoComanda)
.delete("/api/tipo_comanda/:id", deleteTipoComanda);

export default tipoComandaRouter;
