import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getEstadosUsuario, 
  getEstadoUsuario, 
  addEstadoUsuario, 
  updateEstadoUsuario, 
  deleteEstadoUsuario
} from "../controllers/EstadoUsuarioController.ts";

const estadoUsuarioRouter = new Router();

estadoUsuarioRouter
.get("/api/estado_usuario", getEstadosUsuario)
.get("/api/estado_usuario/:id", getEstadoUsuario)
.post("/api/estado_usuario", addEstadoUsuario)
.put("/api/estado_usuario/:id", updateEstadoUsuario)
.delete("/api/estado_usuario/:id", deleteEstadoUsuario);

export default estadoUsuarioRouter;
