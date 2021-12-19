import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Estado_producto } from "../models/EstadoProducto.ts";

const estados_productos = db.collection<Estado_producto>("estados_productos");

const getEstadosProducto = async ({ response }: { response: any }) => {
  try {
    const allEstadosProducto = await estados_productos.find({}).toArray();

    if (allEstadosProducto) {
      response.status = 200;
      response.body = {
        success: true,
        cliente: allEstadosProducto,
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

const getEstadoProducto = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const estadoProducto = await estados_productos.findOne({ 
    _id: oid });

  if (estadoProducto) {
    response.status = 200;
    response.body = {
      success: true,
      estado_producto: estadoProducto,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Estado producto no encontrado.",
    };
  }
};

const addEstadoProducto = async ({
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
      const inputEstadoProducto = await body.value;
      await estados_productos.insertOne(inputEstadoProducto);
      response.status = 201;
      response.body = {
        success: true,
        estado_producto: inputEstadoProducto,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateEstadoProducto = async ({
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
    const inputEstadoProducto = await body.value;

    const estadoProducto = await estados_productos.findOne({_id: oid });
    if (estadoProducto) {
        await estados_productos.updateOne(
            { _id: oid },
            { $set: { 
                clave: inputEstadoProducto.clave,
                glosa: inputEstadoProducto.glosa
            } }
          );
          const updatedEstadoProducto = await estados_productos.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            estado_producto: updatedEstadoProducto,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado producto no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteEstadoProducto = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const estadoProducto = await estados_productos.findOne({_id: oid });
    if (estadoProducto) {
        await estados_productos.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Estado producto eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado producto no encontrado.",
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
  getEstadosProducto, 
  getEstadoProducto, 
  addEstadoProducto, 
  updateEstadoProducto, 
  deleteEstadoProducto };
