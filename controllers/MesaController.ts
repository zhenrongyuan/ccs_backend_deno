import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Mesa } from "../models/Mesa.ts";

const mesas = db.collection<Mesa>("mesas");

const getMesas = async ({ response }: { response: any }) => {
  try {
    const allMesas = await mesas.find({}).toArray();

    if (allMesas) {
      response.status = 200;
      response.body = {
        success: true,
        mesa: allMesas,
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

const getMesa = async ({
  params,
  response,
}: {
  params: { id: string, nombre: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const mesa = await mesas.findOne({ 
    _id: oid });

  if (mesa) {
    response.status = 200;
    response.body = {
      success: true,
      mesa: mesa,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Mesa no encontrado.",
    };
  }
};

const addMesa = async ({
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
      const inputMesa = await body.value;
      await mesas.insertOne(inputMesa);
      response.status = 201;
      response.body = {
        success: true,
        mesa: inputMesa,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateMesa = async ({
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
    const inputMesa = await body.value;

    const mesa = await mesas.findOne({_id: oid });
    if (mesa) {
        await mesas.updateOne(
            { _id: oid },
            { $set: { 
                nombre: inputMesa.nombre,
                capacidad: inputMesa.capacidad,
                piso: inputMesa.piso,
                ubicacion: inputMesa.ubicacion
            } }
          );
          const updatedMesa = await mesas.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            mesa: updatedMesa,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Mesa no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteMesa = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const mesa = await mesas.findOne({_id: oid });
    if (mesa) {
        await mesas.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Mesa eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Mesa no encontrado.",
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
  getMesas,
  getMesa,
  addMesa, 
  updateMesa,
  deleteMesa
};
