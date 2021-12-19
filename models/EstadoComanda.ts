import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

export interface Estado_comanda {
    _id: Bson.ObjectId;
    clave: String,
    glosa: String
}