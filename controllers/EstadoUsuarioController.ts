import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Estado_usuario } from "../models/EstadoUsuario.ts";

const estados_usuarios = db.collection<Estado_usuario>("estados_usuarios");

const getEstadosUsuario = async ({ response }: { response: any }) => {
  try {
    const allEstadosUsuario = await estados_usuarios.find({}).toArray();

    if (allEstadosUsuario) {
      response.status = 200;
      response.body = {
        success: true,
        estado_usuario: allEstadosUsuario,
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

const getEstadoUsuario = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const estadoUsuario = await estados_usuarios.findOne({ 
    _id: oid });

  if (estadoUsuario) {
    response.status = 200;
    response.body = {
      success: true,
      estado_usuario: estadoUsuario,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Estado usuario no encontrado.",
    };
  }
};

const addEstadoUsuario = async ({
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
      const inputEstadoUsuario = await body.value;
      await estados_usuarios.insertOne(inputEstadoUsuario);
      response.status = 201;
      response.body = {
        success: true,
        estado_usuario: inputEstadoUsuario,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateEstadoUsuario = async ({
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
    const inputEstadoUsuario = await body.value;

    const estadoUsuario = await estados_usuarios.findOne({_id: oid });
    if (estadoUsuario) {
        await estados_usuarios.updateOne(
            { _id: oid },
            { $set: { 
                clave: inputEstadoUsuario.clave,
                glosa: inputEstadoUsuario.glosa
            } }
          );
          const updatedEstadoUsuario = await estados_usuarios.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            estado_usuario: updatedEstadoUsuario,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado usuario no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteEstadoUsuario = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const estadoUsuario = await estados_usuarios.findOne({_id: oid });
    if (estadoUsuario) {
        await estados_usuarios.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Estado usuario eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado usuario no encontrado.",
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
  getEstadosUsuario, 
  getEstadoUsuario, 
  addEstadoUsuario, 
  updateEstadoUsuario, 
  deleteEstadoUsuario };
