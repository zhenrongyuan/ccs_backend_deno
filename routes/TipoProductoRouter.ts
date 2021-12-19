import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getTiposProducto, 
  getTipoProducto, 
  addTipoProducto, 
  updateTipoProducto, 
  deleteTipoProducto
} from "../controllers/TipoProductoController.ts";

const tipoProductoRouter = new Router();

tipoProductoRouter
.get("/api/tipo_producto", getTiposProducto)
.get("/api/tipo_producto/:id", getTipoProducto)
.post("/api/tipo_producto", addTipoProducto)
.put("/api/tipo_producto/:id", updateTipoProducto)
.delete("/api/tipo_producto/:id", deleteTipoProducto);

export default tipoProductoRouter;
