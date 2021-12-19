import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Personal } from "../models/Personal.ts";

const personales = db.collection<Personal>("personales");

const getPersonales = async ({ response }: { response: any }) => {
  try {
    const allPersonales = await personales.find({}).toArray();

    if (allPersonales) {
      response.status = 200;
      response.body = {
        success: true,
        personal: allPersonales,
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

const getPersonal = async ({
  params,
  response,
}: {
  params: { id: string, nombre: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const personal = await personales.findOne({ 
    _id: oid });

  if (personal) {
    response.status = 200;
    response.body = {
      success: true,
      personal: personal,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Personal no encontrado.",
    };
  }
};

const addPersonal = async ({
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
      const inputPersonal = await body.value;
      await personales.insertOne(inputPersonal);
      response.status = 201;
      response.body = {
        success: true,
        personal: inputPersonal,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updatePersonal = async ({
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
    const inputPersonal = await body.value;

    const personal = await personales.findOne({_id: oid });
    if (personal) {
        await personales.updateOne(
            { _id: oid },
            { $set: { 
                rut: inputPersonal.rut,
                nombre: inputPersonal.nombre,
                celular: inputPersonal.celular,
                fecha_ingreso: inputPersonal.fecha_ingreso,

            } }
          );
          const updatedPersonal = await personales.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            personal: updatedPersonal,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Personal no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deletePersonal = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const personal = await personales.findOne({_id: oid });
    if (personal) {
        await personales.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Personal eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Personal no encontrado.",
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
  getPersonales,
  getPersonal,
  addPersonal, 
  updatePersonal,
  deletePersonal
};
