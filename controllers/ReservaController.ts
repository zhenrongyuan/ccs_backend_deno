import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Reserva } from "../models/Reserva.ts";

const reservas = db.collection<Reserva>("reservas");

const getReservas = async ({ response }: { response: any }) => {
  try {
    const allReservas = await reservas.find({}).toArray();

    if (allReservas) {
      response.status = 200;
      response.body = {
        success: true,
        reserva: allReservas,
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

const getReserva = async ({
  params,
  response,
}: {
  params: { id: string, nombre: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const reserva = await reservas.findOne({ 
    _id: oid });

  if (reserva) {
    response.status = 200;
    response.body = {
      success: true,
      reserva: reserva,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Reserva no encontrada.",
    };
  }
};

const addReserva = async ({
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
      const inputReserva = await body.value;
      await reservas.insertOne(inputReserva);
      response.status = 201;
      response.body = {
        success: true,
        reserva: inputReserva,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateReserva = async ({
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
    const inputReserva = await body.value;

    const reserva = await reservas.findOne({_id: oid });
    if (reserva) {
        await reservas.updateOne(
            { _id: oid },
            { $set: { 
                cliente: inputReserva.cliente,
                fecha_reserva: inputReserva.fecha_reserva,
                estado: inputReserva.estado,
                cantidad_personas: inputReserva.cantidad_personas,
                comentario: inputReserva.comentario
            } }
          );
          const updatedReserva = await reservas.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            reserva: updatedReserva,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Reserva no encontrada.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteReserva = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const reserva = await reservas.findOne({_id: oid });
    if (reserva) {
        await reservas.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Reserva eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Reserva no encontrada.",
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
  getReservas,
  getReserva,
  addReserva, 
  updateReserva,
  deleteReserva
};
