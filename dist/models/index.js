'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Sequelize = require('sequelize');
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config_1 = __importDefault(require("../config/config"));
const db = {};
let sequelize;
if (env === 'development')
    sequelize = new Sequelize(config_1.default.development.database, config_1.default.development.username, config_1.default.development.password, {
        dialect: 'mysql',
        host: config_1.default.development.host,
        define: {
            //Evitar que nos ponga createdAT y updatedAt
            timestamps: false,
            //Evitar que agregue una s al final
            freezeTableName: true
        }
    });
//Cargar los modelos de base de datos
fs_1.default
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(file => {
    console.log(file);
    const model = require(path_1.default.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log(model.name);
    db[model.name] = model;
});
//Generar las relaciones entre las tablas
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
exports.default = db;
