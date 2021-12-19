import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Estado_cuenta } from "../models/EstadoCuenta.ts";

const estados_cuentas = db.collection<Estado_cuenta>("estados_cuentas");

const getEstadosCuenta = async ({ response }: { response: any }) => {
  try {
    const allEstadosCuenta = await estados_cuentas.find({}).toArray();

    if (allEstadosCuenta) {
      response.status = 200;
      response.body = {
        success: true,
        estado_cuenta: allEstadosCuenta,
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

const getEstadoCuenta = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const oid = new Bson.ObjectId(params.id);
  const estadoCuenta = await estados_cuentas.findOne({ 
    _id: oid });

  if (estadoCuenta) {
    response.status = 200;
    response.body = {
      success: true,
      estado_cuenta: estadoCuenta,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Estado cuenta no encontrado.",
    };
  }
};

const addEstadoCuenta = async ({
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
      const inputEstadoCuenta = await body.value;
      await estados_cuentas.insertOne(inputEstadoCuenta);
      response.status = 201;
      response.body = {
        success: true,
        estado_cuenta: inputEstadoCuenta,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const updateEstadoCuenta = async ({
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
    const inputEstadoCuenta = await body.value;

    const estadoCuenta = await estados_cuentas.findOne({_id: oid });
    if (estadoCuenta) {
        await estados_cuentas.updateOne(
            { _id: oid },
            { $set: { 
                clave: inputEstadoCuenta.clave,
                glosa: inputEstadoCuenta.glosa
            } }
          );
          const updatedEstadoCuenta = await estados_cuentas.findOne({ _id: oid });
          response.status = 200;
          response.body = {
            success: true,
            estado_cuenta: updatedEstadoCuenta,
          }; 
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado cuenta no encontrado.",
        };        
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteEstadoCuenta = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const oid = new Bson.ObjectId(params.id);
    const estadoCuenta = await estados_cuentas.findOne({_id: oid });
    if (estadoCuenta) {
        await estados_cuentas.deleteOne({ _id: oid });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Estado cuenta eliminado",
        };
    }else{
        response.status = 404;
        response.body = {
          success: false,
          msg: "Estado cuenta no encontrado.",
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
  getEstadosCuenta, 
  getEstadoCuenta, 
  addEstadoCuenta, 
  updateEstadoCuenta, 
  deleteEstadoCuenta };
