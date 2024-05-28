import express from "express";
import cors from "cors";
import appDataSource from "./data-source";
import plantRouter from "./routes/PlantRoutes"; 

const port = process.env.PORT || 3000;

appDataSource
  .initialize()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );

    app.use("/api/plants", plantRouter);

    app.get("/", (_req, res) => {
      res.send("Hello world");
    });

    app.listen(port, () => {
      console.log(`API is running on PORT: ${port}`);
    });
  })
  .catch((err: any) => {
    console.error(`Une erreur s'est produite`, err);
  });
