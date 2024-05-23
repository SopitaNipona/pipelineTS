"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const sequelize_1 = require("sequelize");
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["SUPERVISOR"] = "SUPERVISOR";
    UserRoles["AGENT"] = "AGENT";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
module.exports = (sequelize, DataTypes) => {
    class Agente extends sequelize_1.Model {
        ;
        static associate(models) {
        }
    }
    Agente.init({
        awsCognitoId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol: DataTypes.STRING,
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Agente'
    });
    return Agente;
};
