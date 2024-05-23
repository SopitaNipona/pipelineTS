import dynamodb from '../services/dynamoService';
import joi from 'joi';
import { PREFIX_NAME } from '../config';

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

export default UserModel;
