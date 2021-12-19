import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getEstadosCuenta, 
  getEstadoCuenta, 
  addEstadoCuenta, 
  updateEstadoCuenta, 
  deleteEstadoCuenta
} from "../controllers/EstadoCuentaController.ts";

const estadoCuentaRouter = new Router();

estadoCuentaRouter
.get("/api/estado_cuenta", getEstadosCuenta)
.get("/api/estado_cuenta/:id", getEstadoCuenta)
.post("/api/estado_cuenta", addEstadoCuenta)
.put("/api/estado_cuenta/:id", updateEstadoCuenta)
.delete("/api/estado_cuenta/:id", deleteEstadoCuenta);

export default estadoCuentaRouter;
