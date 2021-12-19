import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Cliente } from "../models/Cliente.ts";

const clientes = db.collection<Cliente>("clientes");

const getClientes = async ({ response }: { response: any }) => {
  try {
    const allClientes = await clientes.find({}).toArray();

    if (allClientes) {
      response.status = 200;
      response.body = {
        success: true,
        cliente: allClientes,
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

const getCliente = async ({
  params,
  response,
}: {
  params: { id: string, nombre: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const cliente = await clientes.findOne({ 
    _id: oid });

  if (cliente) {
    response.status = 200;
    response.body = {
      success: true,
      cliente: cliente,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Cliente no encontrado.",
    };
  }
};

const addCliente = async ({
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
      const inputCliente = await body.value;
      await clientes.insertOne(inputCliente);
      response.status = 201;
      response.body = {
        success: true,
        cliente: inputCliente,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateCliente = async ({
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
    const inputCliente = await body.value;

    const cliente = await clientes.findOne({_id: oid });
    if (cliente) {
        await clientes.updateOne(
            { _id: oid },
            { $set: { 
                nombre: inputCliente.nombre,
                correo: inputCliente.correo,
                direccion: inputCliente.direccion,
                celular: inputCliente.celular
            } }
          );
          const updatedCliente = await clientes.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            cliente: updatedCliente,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Cliente no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteCliente = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const cliente = await clientes.findOne({_id: oid });
    if (cliente) {
        await clientes.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Cliente eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Cliente no encontrado.",
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
  getClientes,
  getCliente,
  addCliente, 
  updateCliente,
  deleteCliente
};
