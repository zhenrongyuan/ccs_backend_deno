import { Router } from "https://deno.land/x/oak/mod.ts";
import {addProducto, getProductos, getProducto, updateProducto, deleteProducto,
} from "../controllers/ProductoController.ts";

const productoRouter = new Router();

productoRouter
  .get("/api/producto", getProductos)
  .get("/api/producto/:id", getProducto)
  .post("/api/producto", addProducto)
  .put("/api/producto/:id", updateProducto)
  .delete("/api/producto/:id", deleteProducto);

export default productoRouter;
