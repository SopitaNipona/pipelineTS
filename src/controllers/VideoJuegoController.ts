import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import VideoJuegoModel from "../modelsNOSQL/videojuegoNOSQL";

class VideoJuegoController extends AbstractController {
  // Singleton
  // Atributo de clase
  private static _instance: VideoJuegoController;

  // Método de clase
  public static get instance(): AbstractController {
    if (!this._instance) {
      this._instance = new VideoJuegoController("videojuego");
    }
    return this._instance;
  }

  protected initRoutes(): void {
    this.router.post("/agregar", this.postAgregarVideoJuego.bind(this));
    this.router.get(
      "/TotalVideoJuegos",
      this.getConsultarVideoJuegos.bind(this)
    );
  }

  private async postAgregarVideoJuego(req: Request, res: Response) {
    try {
      console.log(req.body);
      await VideoJuegoModel.create(req.body);
      console.log("VideoJuego creada");
      res.status(200).send("VideoJuego creada");
    } catch (err) {
      console.log(err);
      res.status(500).send("error" + err);
    }
  }

  private async getConsultarVideoJuegos(req: Request, res: Response) {
    try {
      const videojuegos = await VideoJuegoModel.scan().exec().promise();
      console.log(videojuegos);
      res.status(200).send(videojuegos[0].Items);
    } catch (err) {
      console.log(err);
      res.status(500).send("error" + err);
    }
  }
}

export default VideoJuegoController;
