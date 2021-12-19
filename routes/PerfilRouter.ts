import { Router } from "https://deno.land/x/oak/mod.ts";
import {addPerfil, getPerfiles, getPerfil, updatePerfil, deletePerfil,
} from "../controllers/PerfilController.ts";

const perfilRouter = new Router();

perfilRouter
  .get("/api/perfil", getPerfiles)
  .get("/api/perfil/:id", getPerfil)
  .post("/api/perfil", addPerfil)
  .put("/api/perfil/:id", updatePerfil)
  .delete("/api/perfil/:id", deletePerfil);

export default perfilRouter;
