"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const dynamoService_1 = __importDefault(require("../services/dynamoService"));
const joi_1 = __importDefault(require("joi"));
const config_1 = require("../config");
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["SUPERVISOR"] = "SUPERVISOR";
    UserRoles["AGENT"] = "AGENT";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
const UserModel = dynamoService_1.default.define('user', {
    hashKey: 'awsCognitoId',
    timestamps: true,
    schema: {
        awsCognitoId: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        role: joi_1.default.string().required().default(UserRoles.AGENT),
        email: joi_1.default.string().required().email(),
    },
    tableName: `Agente${config_1.PREFIX_NAME}`,
    indexes: [
        {
            hashKey: 'email',
            name: 'EmailIndex',
            type: 'global',
        },
    ],
});
dynamoService_1.default.createTables((err) => {
    if (err)
        return console.log('Error al crear la tabla', err);
    console.log('Tabla creada exitosamente');
});
exports.default = UserModel;
