import { Router } from "https://deno.land/x/oak/mod.ts";
import {addUsuario, getUsuarios, getUsuario, updateUsuario, deleteUsuario,
} from "../controllers/UsuarioController.ts";

const usuarioRouter = new Router();

usuarioRouter
  .get("/api/usuario", getUsuarios)
  .get("/api/usuario/:id", getUsuario)
  .post("/api/usuario", addUsuario)
  .put("/api/usuario/:id", updateUsuario)
  .delete("/api/usuario/:id", deleteUsuario);

export default usuarioRouter;
