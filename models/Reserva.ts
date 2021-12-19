import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { Cliente } from './Cliente.ts';
import { Estado_reserva } from './EstadoReserva.ts';

export interface Reserva {
    _id: Bson.ObjectId;
    cliente: Cliente;
    fecha_reserva: String;
    estado: Estado_reserva;
    cantidad_personas: Number;
    comentario: String;
  }