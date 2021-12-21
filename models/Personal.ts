import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

export interface Personal {
  _id: Bson.ObjectId;
  rut: string,
  nombre: string,
  direccion: string,
  celular: string,
  fecha_ingreso: string
}