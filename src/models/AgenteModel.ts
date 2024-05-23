import {Model,Sequelize} from 'sequelize';
import AgenteController from '../controllers/AgenteController';

interface AgenteAttributes {
    awsCognitoId:string;
    nombre:string;
    rol:string;
    email:string;
}

export enum UserRoles{
    ADMIN = 'ADMIN',
    SUPERVISOR = "SUPERVISOR",
    AGENT = "AGENT"
  }

module.exports = (sequelize:any,DataTypes:any) => {
    class Agente extends Model<AgenteAttributes> implements AgenteAttributes{
        public awsCognitoId!:string;
        public nombre!:string;
        public rol!: string;;
        public email!:string;

        static associate(models:any){

        }

    }
    Agente.init({
        awsCognitoId:{
            type: DataTypes.STRING,
            allowNull:false,
            primaryKey: true
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        rol:DataTypes.STRING,
        email:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
    },{
        sequelize,
        modelName:'Agente'
    });
    return Agente;

}