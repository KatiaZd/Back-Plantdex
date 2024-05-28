CREATE TABLE "plant" (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  soleil VARCHAR(255),
  arrosage VARCHAR(255),
  categorie VARCHAR(255),
  image TEXT
);
