/*import Server from './provider/Server';
import {PORT,NODE_ENV} from './config';
import express from 'express';
import cors from 'cors';
import AgenteController from './controllers/AgenteController';
import AuthenticationController from './controllers/AuthenticationController';

const server = new Server({
    port:PORT,
    env:NODE_ENV,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true}),
        cors()
    ],
    controllers:[
        AgenteController.instance,
        AuthenticationController.instance
    ]
});

//Extendiendo la interfaz Request de Express para poder acceder a los datos del usuario
declare global {
    namespace Express {
        interface Request {
            user: string;
            token: string;
        }
    }
}

server.init();*/

import dynamodb from './services/dynamoService';
import joi from 'joi';
import { PREFIX_NAME } from './config';

export enum UserRoles {
	ADMIN = 'ADMIN',
	SUPERVISOR = 'SUPERVISOR',
	AGENT = 'AGENT'
}

const UserModel = dynamodb.define('cliente', {
    hashKey: 'hash',
    timestamps: true,
    schema: {
        hash: joi.string().required(),
        name: joi.string().required(),
        contraseña: joi.string().required(),
        email: joi.string().required().email(),
    },
    tableName: `Clientes`,
    indexes: [
        {
            hashKey: 'email',
            name: 'EmailIndex',
            type: 'global',
        },
    ],
});

dynamodb.createTables((err: any) => {
    if (err) {
        console.log('Error al crear la tabla', err);
    } else {
        console.log('Tabla creada exitosamente');
    }
});
