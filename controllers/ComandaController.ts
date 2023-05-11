import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Comanda } from "../models/Comanda.ts";

const comandas = db.collection<Comanda>("comandas");

const getComandas = async ({ response }: { response: any }) => {
  try {
    const allComandas = await comandas.find({}).toArray();

    if (allComandas) {
      response.status = 200;
      response.body = {
        success: true,
        comandas: allComandas,
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

const getComanda = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const comanda = await comandas.findOne({ 
    _id: oid });

  if (comanda) {
    response.status = 200;
    response.body = {
      success: true,
      comanda: comanda,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Comanda no encontrada.",
    };
  }
};

const addComanda = async ({
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
      const inputComanda = await body.value;
      await comandas.insertOne(inputComanda);
      response.status = 201;
      response.body = {
        success: true,
        comanda: inputComanda,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateComanda = async ({
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
    const inputComanda = await body.value;

    const comanda = await comandas.findOne({_id: oid });
    if (comanda) {
        await comandas.updateOne(
            { _id: oid },
            { $set: { 
                cliente: inputComanda.cliente,
                mesa: inputComanda.mesa,
                tipo: inputComanda.tipo,
                personal: inputComanda.personal,
                detalle: inputComanda.detalle,
                cuenta: inputComanda.cuenta
            } }
          );
          const updatedComanda = await comandas.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            comanda: updatedComanda,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Comanda no encontrada.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteComanda = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const comanda = await comandas.findOne({_id: oid });
    if (comanda) {
        await comandas.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Comanda eliminada",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Comanda no encontrada.",
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
  getComandas, 
  getComanda,
  addComanda,
  updateComanda,
  deleteComanda
};
