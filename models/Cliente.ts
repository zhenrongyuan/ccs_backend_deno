import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

export interface Cliente {
    _id: Bson.ObjectId;
    nombre: string,
    correo: string,
    direccion: string,
    celular: string
}