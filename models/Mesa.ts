import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

export interface Mesa {
    _id: Bson.ObjectId;
    nombre: string,
    capacidad: number,
    piso: number,
    ubicacion: string
}