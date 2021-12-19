import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Estado_comanda } from "../models/EstadoComanda.ts";

const estados_comandas = db.collection<Estado_comanda>("estados_comandas");

const getEstadosComanda = async ({ response }: { response: any }) => {
  try {
    const allEstadosComanda = await estados_comandas.find({}).toArray();

    if (allEstadosComanda) {
      response.status = 200;
      response.body = {
        success: true,
        cliente: allEstadosComanda,
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

const getEstadoComanda = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const estadoComanda = await estados_comandas.findOne({ 
    _id: oid });

  if (estadoComanda) {
    response.status = 200;
    response.body = {
      success: true,
      estado_comanda: estadoComanda,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Estado comanda no encontrado.",
    };
  }
};

const addEstadoComanda = async ({
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
      const inputEstadoComanda = await body.value;
      await estados_comandas.insertOne(inputEstadoComanda);
      response.status = 201;
      response.body = {
        success: true,
        estado_comanda: inputEstadoComanda,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateEstadoComanda = async ({
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
    const inputEstadoComanda = await body.value;

    const estadoComanda = await estados_comandas.findOne({_id: oid });
    if (estadoComanda) {
        await estados_comandas.updateOne(
            { _id: oid },
            { $set: { 
                clave: inputEstadoComanda.clave,
                glosa: inputEstadoComanda.glosa
            } }
          );
          const updatedEstadoComanda = await estados_comandas.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            estado_comanda: updatedEstadoComanda,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado comanda no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteEstadoComanda = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const estadoComanda = await estados_comandas.findOne({_id: oid });
    if (estadoComanda) {
        await estados_comandas.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Estado comanda eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado comanda no encontrado.",
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
  getEstadosComanda, 
  getEstadoComanda, 
  addEstadoComanda, 
  updateEstadoComanda, 
  deleteEstadoComanda };
