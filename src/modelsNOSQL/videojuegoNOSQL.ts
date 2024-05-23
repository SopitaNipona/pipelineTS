import dynamodb from '../services/dynamoService'
import joi from "joi";
import {PREFIX_NAME} from "../config";

const VideoJuegoModel = dynamodb.define('videojuego',{
    hashKey:'VideoJuegoId',
    timestamps:false,
    schema:{
        VideoJuegoId:dynamodb.types.uuid(),
        nombre:joi.string(),
        genero:joi.string(),
        calificacion:joi.number()
    },
    tableName: `VideoJuego${PREFIX_NAME}`
})


dynamodb.createTables((err) => {
    if(err)
        return console.log(err);
    console.log("Tabla creada")
})

export default VideoJuegoModel;
