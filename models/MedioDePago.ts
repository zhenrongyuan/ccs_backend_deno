import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

export interface Medio_de_pago {
    _id: Bson.ObjectId;
    clave: string,
    glosa: string
}