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
const agenteNOSQL_1 = __importDefault(require("../modelsNOSQL/agenteNOSQL"));
const models_1 = __importDefault(require("../models"));
class AuthenticationController extends AbstractController_1.default {
    //Método de clase
    static get instance() {
        return this._instance || (this._instance = new this('auth'));
    }
    initRoutes() {
        this.router.post('/signup', this.signup.bind(this));
        this.router.post('/verify', this.verify.bind(this));
        this.router.post('/signin', this.signin.bind(this));
        this.router.get('/test', this.authMiddleware.verifyToken, this.test.bind(this));
    }
    test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send("Esto es una prueba");
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const login = yield this.cognitoService.signInUser(email, password);
                res.status(200).send(Object.assign({}, login.AuthenticationResult));
            }
            catch (error) {
                res.status(500).send({ code: error.code, message: error.message }).end();
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, code } = req.body;
            try {
                yield this.cognitoService.verifyUser(email, code);
                console.log("Usuario de cognito verificado", email);
                return res.status(200).send({ message: "verified user" }).end();
            }
            catch (error) {
                res.status(500).send({ code: error.code, message: error.message }).end();
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, role } = req.body;
            console.log(req.body);
            try {
                //Create a new user in Cognito
                const user = yield this.cognitoService.signUpUser(email, password, [
                    {
                        Name: 'email',
                        Value: email
                    }
                ]);
                if (user) {
                    yield agenteNOSQL_1.default.create({
                        awsCognitoId: user.UserSub,
                        name,
                        role,
                        email
                    }, { overwrite: false });
                    console.log('Usuario guardado en BDNoSQL');
                    yield models_1.default['Agente'].create({
                        awsCognitoId: user.UserSub,
                        name,
                        role,
                        email
                    });
                }
                //Guard el usuario en DB relacional (MySQL)
                console.log("Usuario de cognito creado", user);
                res.status(201).send({ message: "User signedUp" });
            }
            catch (error) {
                res.status(500).send({ code: error.code, message: error.message }).end();
            }
        });
    }
}
exports.default = AuthenticationController;
