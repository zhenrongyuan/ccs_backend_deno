import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { Personal } from './Personal.ts';
import { Perfil } from './Perfil.ts';
import { Estado_usuario } from './EstadoUsuario.ts';

export interface Usuario {
    _id: Bson.ObjectId;
    personal: Personal;
    perfiles: [
        {
            perfil: Perfil;
        }
    ],
    password: string,
    intento: number,
    estado: Estado_usuario
}