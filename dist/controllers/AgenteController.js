"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = __importDefault(require("./AbstractController"));
const models_1 = __importDefault(require("../models"));
const departamentoNOSQL_1 = __importDefault(require("../modelsNOSQL/departamentoNOSQL"));
class AgenteController extends AbstractController_1.default {
    //Metodo de clase
    static get instance() {
        if (!this._instance) {
            this._instance = new AgenteController("agente");
        }
        return this._instance;
    }
    //Declarar todas las rutas del controlador
    initRoutes() {
        this.router.get('/testagent', this.getTestAgent.bind(this));
        this.router.get('/consultarAgentes', this.getConsultarAgentes.bind(this));
        this.router.post('/crearAgente', this.postCrearAgente.bind(this));
        this.router.post('/crearDepartamento', this.postCrearDepartamento.bind(this));
        this.router.get('/consultaDepto', this.getConsultaDepto.bind(this));
    }
    getConsultaDepto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deptos = yield departamentoNOSQL_1.default.scan().exec().promise();
                console.log(deptos);
                res.status(200).send(deptos[0].Items);
            }
            catch (err) {
                console.log(err);
                res.status(500).send('Internal server error' + err);
            }
        });
    }
    postCrearDepartamento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield departamentoNOSQL_1.default.create(req.body);
                console.log("Departamento creado");
                res.status(200).send("<h1>Departamento creado</h1>");
            }
            catch (err) {
                console.log(err);
                res.status(500).send('Internal server error' + err);
            }
        });
    }
    //10.48.120.198
    postCrearAgente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield models_1.default.Agente.create(req.body); //INSERT
                console.log("Agente creado");
                res.status(200).send("<h1>Agente creado</h1>");
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error' + error);
            }
        });
    }
    getConsultarAgentes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Consultar agentes");
                let agentes = yield models_1.default["Agente"].findAll(); //SELECT * FROM Agente;
                res.status(200).json(agentes);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error' + error);
            }
        });
    }
    //Metodos de instancia
    getTestAgent(req, res) {
        try {
            console.log("Prueba exitosa");
            res.status(200).send("<h1>Prueba exitosa</h1>");
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Internal server error' + error);
        }
    }
}
exports.default = AgenteController;
