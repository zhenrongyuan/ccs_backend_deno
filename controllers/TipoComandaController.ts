import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Tipo_comanda } from "../models/TipoComanda.ts";

const tipos_comandas = db.collection<Tipo_comanda>("tipos_comandas");

const getTiposComanda = async ({ response }: { response: any }) => {
  try {
    const allTiposComanda = await tipos_comandas.find({}).toArray();

    if (allTiposComanda) {
      response.status = 200;
      response.body = {
        success: true,
        cliente: allTiposComanda,
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

const getTipoComanda = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const tipoComanda = await tipos_comandas.findOne({ 
    _id: oid });

  if (tipoComanda) {
    response.status = 200;
    response.body = {
      success: true,
      tipo_comanda: tipoComanda,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Tipo comanda no encontrado.",
    };
  }
};

const addTipoComanda = async ({
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
      const inputTipoComanda = await body.value;
      await tipos_comandas.insertOne(inputTipoComanda);
      response.status = 201;
      response.body = {
        success: true,
        tipo_comanda: inputTipoComanda,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateTipoComanda = async ({
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
    const inputTipoComanda = await body.value;

    const tipoComanda = await tipos_comandas.findOne({_id: oid });
    if (tipoComanda) {
        await tipos_comandas.updateOne(
            { _id: oid },
            { $set: { 
                clave: inputTipoComanda.clave,
                glosa: inputTipoComanda.glosa
            } }
          );
          const updatedTipoComanda = await tipos_comandas.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            tipo_comanda: updatedTipoComanda,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Tipo comanda no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteTipoComanda = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const tipoComanda = await tipos_comandas.findOne({_id: oid });
    if (tipoComanda) {
        await tipos_comandas.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Tipo comanda eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Tipo comanda no encontrado.",
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
  getTiposComanda, 
  getTipoComanda, 
  addTipoComanda, 
  updateTipoComanda, 
  deleteTipoComanda };
