import AppDataSource from "../data-source";
import { Plant } from "../entities/Plant";

class PlantService {
  private plantRepository = AppDataSource.getRepository(Plant);

  async getAll() {
    console.log("GetAll");
    return this.plantRepository.find();
  }

  async getById(id: number) {
    console.log("GetById");
    return this.plantRepository.findOneBy({ id: id });
  }

  async create(plant: Plant) {
    console.log("Create");
    const newPlant = await this.plantRepository.create(plant);
    return this.plantRepository.save(newPlant);
  }

  async update(id: string, plant: Plant) {
    console.log("Update");
    return this.plantRepository.update(id, plant);
  }

  async delete(id: string) {
    console.log("Delete");
    return this.plantRepository.delete(id);
  }
}

export default PlantService;
