import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Tipo_producto } from "../models/TipoProducto.ts";

const tipos_productos = db.collection<Tipo_producto>("tipos_productos");

const getTiposProducto = async ({ response }: { response: any }) => {
  try {
    const allTiposProducto = await tipos_productos.find({}).toArray();

    if (allTiposProducto) {
      response.status = 200;
      response.body = {
        success: true,
        cliente: allTiposProducto,
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

const getTipoProducto = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const tipoProducto = await tipos_productos.findOne({ 
    _id: oid });

  if (tipoProducto) {
    response.status = 200;
    response.body = {
      success: true,
      tipo_producto: tipoProducto,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Tipo producto no encontrado.",
    };
  }
};

const addTipoProducto = async ({
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
      const inputTipoProducto = await body.value;
      await tipos_productos.insertOne(inputTipoProducto);
      response.status = 201;
      response.body = {
        success: true,
        tipo_producto: inputTipoProducto,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateTipoProducto = async ({
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
    const inputTipoProducto = await body.value;

    const tipoProducto = await tipos_productos.findOne({_id: oid });
    if (tipoProducto) {
        await tipos_productos.updateOne(
            { _id: oid },
            { $set: { 
                clave: inputTipoProducto.clave,
                glosa: inputTipoProducto.glosa
            } }
          );
          const updatedTipoProducto = await tipos_productos.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            tipo_producto: updatedTipoProducto,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Tipo producto no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteTipoProducto = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const tipoProducto = await tipos_productos.findOne({_id: oid });
    if (tipoProducto) {
        await tipos_productos.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Tipo producto eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Tipo producto no encontrado.",
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
  getTiposProducto, 
  getTipoProducto, 
  addTipoProducto, 
  updateTipoProducto, 
  deleteTipoProducto };
