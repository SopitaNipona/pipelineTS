import { Request, Response, NextFunction } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

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
    this.router.get("/id", this.getId.bind(this));
    this.router.get("/perfil",this.getPerfil.bind(this)
    );
  
  }

  private async getId(req: Request, res: Response) {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(400).send("ID es requerido");
      }

      const cliente = await db.Cliente.findByPk(id as string);
      if (!cliente) {
        return res.status(404).send("Cliente no encontrado");
      }

      res.status(200).json(cliente);
    } catch (err) {
      console.error("Error al encontrar cliente:", err);
      res.status(500).send("Error al encontrar cliente");
    }
  }
  

  private async getPerfil(req: AuthenticatedRequest, res: Response) {
    try {
      const clienteId = req.user?.id;
      if (!clienteId) {
        return res.status(401).send("Acceso no autorizado");
      }

      const cliente = await db.Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).send("Cliente no encontrado");
      }

      res.status(200).json(cliente);
    } catch (err) {
      console.error("Error al obtener el perfil del cliente:", err);
      res.status(500).send("Error al obtener el perfil del cliente");
    }
  }

  
}

export default ClienteController;
