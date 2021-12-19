import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Perfil } from "../models/Perfil.ts";

const perfiles = db.collection<Perfil>("perfiles");

const getPerfiles = async ({ response }: { response: any }) => {
  try {
    const allPerfiles = await perfiles.find({}).toArray();

    if (allPerfiles) {
      response.status = 200;
      response.body = {
        success: true,
        perfil: allPerfiles,
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

const getPerfil = async ({
  params,
  response,
}: {
  params: { id: string, nombre: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const perfil = await perfiles.findOne({ 
    _id: oid });

  if (perfil) {
    response.status = 200;
    response.body = {
      success: true,
      perfil: perfil,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Perfil no encontrado.",
    };
  }
};

const addPerfil = async ({
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
      const inputPerfil = await body.value;
      await perfiles.insertOne(inputPerfil);
      response.status = 201;
      response.body = {
        success: true,
        perfil: inputPerfil,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updatePerfil = async ({
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
    const inputPerfil = await body.value;

    const perfil = await perfiles.findOne({_id: oid });
    if (perfil) {
        await perfiles.updateOne(
            { _id: oid },
            { $set: { 
                clave: inputPerfil.clave,
                glosa: inputPerfil.glosa
            } }
          );
          const updatedPerfil = await perfiles.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            perfil: updatedPerfil,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Perfil no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deletePerfil = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const perfil = await perfiles.findOne({_id: oid });
    if (perfil) {
        await perfiles.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Perfil eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Perfil no encontrado.",
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
  getPerfiles,
  getPerfil,
  addPerfil, 
  updatePerfil,
  deletePerfil
};
