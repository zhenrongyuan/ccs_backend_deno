import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Usuario } from "../models/Usuario.ts";

const usuarios = db.collection<Usuario>("usuarios");

const getUsuarios = async ({ response }: { response: any }) => {
  try {
    const allUsuarios = await usuarios.find({}).toArray();

    if (allUsuarios) {
      response.status = 200;
      response.body = {
        success: true,
        usuario: allUsuarios,
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

const getUsuario = async ({
  params,
  response,
}: {
  params: { id: string, nombre: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const usuario = await usuarios.findOne({ 
    _id: oid });

  if (usuario) {
    response.status = 200;
    response.body = {
      success: true,
      usuario: usuario,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Usuario no encontrado.",
    };
  }
};

const addUsuario = async ({
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
      const inputUsuario = await body.value;
      await usuarios.insertOne(inputUsuario);
      response.status = 201;
      response.body = {
        success: true,
        usuario: inputUsuario,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateUsuario = async ({
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
    const inputUsuario = await body.value;

    const usuario = await usuarios.findOne({_id: oid });
    if (usuario) {
        await usuarios.updateOne(
            { _id: oid },
            { $set: { 
                personal: inputUsuario.personal,
                perfiles: inputUsuario.perfiles,
                password: inputUsuario.password,
                intento: inputUsuario.intento,
                estado: inputUsuario.estado
            } }
          );
          const updatedUsuario = await usuarios.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            usuario: updatedUsuario,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Usuario no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteUsuario = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const usuario = await usuarios.findOne({_id: oid });
    if (usuario) {
        await usuarios.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Usuario eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Usuario no encontrado.",
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
  getUsuarios,
  getUsuario,
  addUsuario, 
  updateUsuario,
  deleteUsuario
};
