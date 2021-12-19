import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getEstadosProducto, 
  getEstadoProducto, 
  addEstadoProducto, 
  updateEstadoProducto, 
  deleteEstadoProducto
} from "../controllers/EstadoProductoController.ts";

const estadoProductoRouter = new Router();

estadoProductoRouter
.get("/api/estado_producto", getEstadosProducto)
.get("/api/estado_producto/:id", getEstadoProducto)
.post("/api/estado_producto", addEstadoProducto)
.put("/api/estado_producto/:id", updateEstadoProducto)
.delete("/api/estado_producto/:id", deleteEstadoProducto);

export default estadoProductoRouter;
