import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Medio_de_pago } from "../models/MedioDePago.ts";

const medios_de_pagos = db.collection<Medio_de_pago>("medios_de_pagos");

const getMediosDePago = async ({ response }: { response: any }) => {
  try {
    const allMediosDePago = await medios_de_pagos.find({}).toArray();

    if (allMediosDePago) {
      response.status = 200;
      response.body = {
        success: true,
        medio_de_pago: allMediosDePago,
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

const getMedioDePago = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const medioDePago = await medios_de_pagos.findOne({ 
    _id: oid });

  if (medioDePago) {
    response.status = 200;
    response.body = {
      success: true,
      medio_de_pago: medioDePago,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Medio de Pago no encontrado.",
    };
  }
};

const addMedioDePago = async ({
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
      const inputMedioDePago = await body.value;
      await medios_de_pagos.insertOne(inputMedioDePago);
      response.status = 201;
      response.body = {
        success: true,
        medio_de_pago: inputMedioDePago,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateMedioDePago = async ({
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
    const inputMedioDePago = await body.value;

    const medioDePago = await medios_de_pagos.findOne({_id: oid });
    if (medioDePago) {
        await medios_de_pagos.updateOne(
            { _id: oid },
            { $set: { 
                clave: inputMedioDePago.clave,
                glosa: inputMedioDePago.glosa
            } }
          );
          const updatedMedioDePago = await medios_de_pagos.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            medio_de_pago: updatedMedioDePago,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Medio de Pago no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteMedioDePago = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const medioDePago = await medios_de_pagos.findOne({_id: oid });
    if (medioDePago) {
        await medios_de_pagos.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Medio de Pago eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Medio de Pago no encontrado.",
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
  getMediosDePago, 
  getMedioDePago, 
  addMedioDePago, 
  updateMedioDePago, 
  deleteMedioDePago };
