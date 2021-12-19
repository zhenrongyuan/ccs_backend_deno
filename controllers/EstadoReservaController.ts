import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Estado_reserva } from "../models/EstadoReserva.ts";

const estados_reservas = db.collection<Estado_reserva>("estados_reservas");

const getEstadosReserva = async ({ response }: { response: any }) => {
  try {
    const allEstadosReserva = await estados_reservas.find({}).toArray();

    if (allEstadosReserva) {
      response.status = 200;
      response.body = {
        success: true,
        estado_reserva: allEstadosReserva,
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

const getEstadoReserva = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const estadoReserva = await estados_reservas.findOne({ 
    _id: oid });

  if (estadoReserva) {
    response.status = 200;
    response.body = {
      success: true,
      estado_reserva: estadoReserva,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Estado reserva no encontrado.",
    };
  }
};

const addEstadoReserva = async ({
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
      const inputEstadoReserva = await body.value;
      await estados_reservas.insertOne(inputEstadoReserva);
      response.status = 201;
      response.body = {
        success: true,
        estado_reserva: inputEstadoReserva,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateEstadoReserva = async ({
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
    const inputEstadoReserva = await body.value;

    const estadoReserva = await estados_reservas.findOne({_id: oid });
    if (estadoReserva) {
        await estados_reservas.updateOne(
            { _id: oid },
            { $set: { 
                clave: inputEstadoReserva.clave,
                glosa: inputEstadoReserva.glosa
            } }
          );
          const updatedEstadoReserva = await estados_reservas.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            estado_reserva: updatedEstadoReserva,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado reserva no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteEstadoReserva = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const estadoReserva = await estados_reservas.findOne({_id: oid });
    if (estadoReserva) {
        await estados_reservas.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Estado reserva eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado reserva no encontrado.",
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
  getEstadosReserva, 
  getEstadoReserva, 
  addEstadoReserva, 
  updateEstadoReserva, 
  deleteEstadoReserva };
