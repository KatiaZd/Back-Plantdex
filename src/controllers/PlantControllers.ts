import { Request, Response } from "express";
import PlantService from "../services/PlantServices";

class PlantController {
  private plantService = new PlantService();

  async getAll(_req: Request, res: Response) {
    console.log("PlantController - GetAll");
    const plants = await this.plantService.getAll();
    res.send({ status: "OK", data: plants });
  }

  async getById(req: Request, res: Response) {
    console.log("PlantController - GetByID");
    const plant = await this.plantService.getById(Number(req.params.id));
    res.send({ status: "OK", data: plant });
  }

  async create(req: Request, res: Response) {
    console.log("PlantController - Create");
    const plant = await this.plantService.create(req.body);
    res.send({ status: "OK", data: plant });
  }

  async update(req: Request, res: Response) {
    console.log("PlantController - Update");
    const plant = await this.plantService.update(req.params.id, req.body);
    res.send({ status: "OK", data: plant });
  }

  async delete(req: Request, res: Response) {
    console.log("PlantController - Delete");
    const plant = await this.plantService.delete(req.params.id);
    res.send({ status: "OK", data: plant });
  }
}

export default PlantController;
