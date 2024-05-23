"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoService_1 = __importDefault(require("../services/dynamoService"));
const joi_1 = __importDefault(require("joi"));
const config_1 = require("../config");
const DepartamentoModel = dynamoService_1.default.define('departamento', {
    hashKey: 'DepartamentoId',
    timestamps: false,
    schema: {
        DepartamentoId: dynamoService_1.default.types.uuid(),
        Nombre: joi_1.default.string(),
        numAgentes: joi_1.default.number()
    },
    tableName: `Departamento${config_1.PREFIX_NAME}`
});
/*dynamodb.createTables((err)=>{
    if(err)
        return console.log(err);
    console.log('Tabla creada exitosamente')
})*/
exports.default = DepartamentoModel;
