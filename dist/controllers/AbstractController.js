"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Middlewares
const authorization_1 = __importDefault(require("../middlewares/authorization"));
//Servicios
const cognitoService_1 = __importDefault(require("../services/cognitoService"));
class AbstractController {
    get router() {
        return this._router;
    }
    set router(_router) {
        this._router = _router;
    }
    get prefix() {
        return this._prefix;
    }
    constructor(prefix) {
        this.authMiddleware = authorization_1.default.instance;
        this.cognitoService = cognitoService_1.default.instance;
        this._router = (0, express_1.Router)();
        this._prefix = prefix;
        this.initRoutes();
    }
}
exports.default = AbstractController;
