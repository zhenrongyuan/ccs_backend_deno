import { Router } from "https://deno.land/x/oak/mod.ts";
import {addPersonal, getPersonales, getPersonal, updatePersonal, deletePersonal,
} from "../controllers/PersonalController.ts";

const personalRouter = new Router();

personalRouter
  .get("/api/personal", getPersonales)
  .get("/api/personal/:id", getPersonal)
  .post("/api/personal", addPersonal)
  .put("/api/personal/:id", updatePersonal)
  .delete("/api/personal/:id", deletePersonal);

export default personalRouter;
