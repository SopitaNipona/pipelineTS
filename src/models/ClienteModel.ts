import {Model, Sequelize} from "sequelize"

interface ClienteAtributes {
    id: number;
    nombre: string;
    correo: string;
    contrasenia: string;
}

module.exports = (sequelize: any,DataTypes: any) => {
    class Cliente extends Model<ClienteAtributes> implements ClienteAtributes {
        public id!: number;
        nombre!: string;
        correo!: string;
        contrasenia!: string;
    }
    Cliente.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        correo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        contrasenia:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        sequelize,
        modelName:'Cliente'
    });
    return Cliente;
}
