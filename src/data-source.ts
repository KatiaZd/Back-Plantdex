import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Plant } from "./entities/Plant";


dotenv.config({ path: ".env.local" });

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Plant],
  synchronize: true,
});

export default AppDataSource;
