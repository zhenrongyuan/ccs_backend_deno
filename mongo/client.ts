import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

const URI = "mongodb://127.0.0.1:27017";

// Mongo Connection Init
const mongoClient = new MongoClient();
try {
  await mongoClient.connect(URI);
  console.log("Conectado a la base de datos correctamente.");
} catch (err) {
  console.log(err);
}

// export const db = mongoClient.database("ccs_restaurant_menchoy");
export const db = mongoClient.database("ccs_restaurant_cdb");
