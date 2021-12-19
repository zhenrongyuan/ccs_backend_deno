import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

export interface Personal {
    _id: Bson.ObjectId;
    rut: String,
    nombre: String,
    direccion: String,
    celular: String,
    fecha_ingreso: String
  }