import { Request, Response, NextFunction } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import { Sequelize } from "sequelize";

class ClienteController extends AbstractController {
  // Singleton
  // Atributos de clase
  private static _instance: ClienteController;
  public static get instance(): ClienteController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new ClienteController("cliente");
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.post("/crear", this.postCrear.bind(this));
    this.router.get("/TotalClientes",this.getTotalClientes.bind(this));
}

private async postCrear(req: Request, res: Response){
  try{
      console.log(req.body);
      await db.Agente.create(req.body);
      console.log("Agente creado")
      res.status(200).send("Agente creado");
  }catch(err){
      console.error(err);
      res.status(500).send("Error al crear agente");
  }
}
  
private async getTotalClientes (req: Request, res: Response) {
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
