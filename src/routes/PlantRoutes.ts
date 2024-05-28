import { Router } from "express";
import PlantController from "../controllers/PlantControllers";

const plantRouter = Router();
const plantController = new PlantController();

plantRouter.get("/", (req, res) => {
  console.log("GetAll route");
  plantController.getAll(req, res);
});

plantRouter.get("/:id", (req, res) => {
  console.log("GetById route");
  plantController.getById(req, res);
});

plantRouter.post("/", (req, res) => {
  console.log("Create route");
  plantController.create(req, res);
});

plantRouter.put("/:id", (req, res) => {
  console.log("Update route");
  plantController.update(req, res);
});

plantRouter.delete("/:id", (req, res) => {
  console.log("Delete route");
  plantController.delete(req, res);
});

export default plantRouter;
