import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Producto } from "../models/Producto.ts";

const productos = db.collection<Producto>("productos");

const getProductos = async ({ response }: { response: any }) => {
  try {
    const allProductos = await productos.find({}).toArray();

    if (allProductos) {
      response.status = 200;
      response.body = {
        success: true,
        producto: allProductos,
      };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const getProducto = async ({
  params,
  response,
}: {
  params: { id: string, nombre: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const producto = await productos.findOne({ 
    _id: oid });

  if (producto) {
    response.status = 200;
    response.body = {
      success: true,
      producto: producto,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Producto no encontrado.",
    };
  }
};

const addProducto = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No hay datos en la solicitud.",
      };
    } else {
      const body = await request.body();
      const inputProducto = await body.value;
      await productos.insertOne(inputProducto);
      response.status = 201;
      response.body = {
        success: true,
        producto: inputProducto,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateProducto = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const body = await request.body();
    const oid = new Bson.ObjectId(params.id);
    const inputProducto = await body.value;

    const producto = await productos.findOne({_id: oid });
    if (producto) {
        await productos.updateOne(
            { _id: oid },
            { $set: { 
                nombre: inputProducto.nombre,
                descripcion: inputProducto.descripcion,
                precio: inputProducto.precio,
                popularidad: inputProducto.popularidad,
                tipo: inputProducto.tipo,
                estado: inputProducto.estado
            } }
          );
          const updatedProducto = await productos.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            producto: updatedProducto,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Producto no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteProducto = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const producto = await productos.findOne({_id: oid });
    if (producto) {
        await productos.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Producto eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Producto no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

export { 
  getProductos,
  getProducto,
  addProducto, 
  updateProducto,
  deleteProducto
};
