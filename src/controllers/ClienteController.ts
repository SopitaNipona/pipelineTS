import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class ClienteController extends AbstractController {
  // Singleton
  // Atributo de clase
  private static _instance: ClienteController;
	
  // Método de clase
  public static get instance(): AbstractController {
    if (!this._instance) {
      this._instance = new ClienteController("cliente");
    }
    return this._instance;
  }
  
  protected initRoutes(): void {
    this.router.post(
      "/crear",
      this.postAgregarCliente.bind(this)
    );
    this.router.get(
      "/consultar",
      this.getConsultarClientes.bind(this)
    );
  }

  private async postAgregarCliente(req: Request, res: Response) {
    try {
      console.log(req.body);
      await db.Videogame.create(req.body);
      console.log("Cliente creado");
      res.status(200).send("Cliente creado");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Error" + error);
    }
  }

  private async getConsultarClientes (req: Request, res: Response) {
    try {
        const clientes = await db.Cliente.findAll({
            attributes: ['idCliente', 'nombre']
        });
  
        res.status(200).json(clientes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener clientes");
    }
  }
}

export default ClienteController;
