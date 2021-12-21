import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

export interface Tipo_comanda {
    _id: Bson.ObjectId;
    clave: string,
    glosa: string
}