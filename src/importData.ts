import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Chemin vers le fichier
const envPath = path.resolve(__dirname, "../.env.local");
console.log(`Loading environment variables from ${envPath}`);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error("Error loading .env file", result.error);
  throw result.error;
}

console.log(result.parsed); // Affiche les variables chargées


console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

// Utilise les variables d'environnement correctement dans la configuration de la bdd
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});


const checkConnection = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to the database successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    const filePath = path.join(
      __dirname,
      "../../ExoBack-plantdexV2-angular/fausse_BDD_plantdex.json" // Chemin vers le mock JSON dans le dossier front
    );
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);

    for (const item of data.plants) {
      try {
        await pool.query(
          "INSERT INTO plant (id, nom, soleil, arrosage, categorie, image) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING",
          [
            item.id,
            item.nom,
            item.soleil,
            item.arrosage,
            item.categorie,
            item.image,
          ]
        );
      } catch (err) {
        console.error(`Error inserting item with id ${item.id}:`, err);
      }
    }

    console.log("Importation terminée.");
  } catch (err) {
    console.error("Error reading or parsing the JSON file:", err);
  } finally {
    await pool.end();
  }
};

checkConnection().then(importData).catch(console.error);
