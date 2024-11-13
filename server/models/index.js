import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import defineUser from "./user.js";
import defineAlbum from "./album.js";
import defineArtist from "./artist.js";
import defineGenre from "./genre.js";
import defineFavorite from "./favorite.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const models = {
  User: defineUser(sequelize),
  Album: defineAlbum(sequelize),
  Artist: defineArtist(sequelize),
  Genre: defineGenre(sequelize),
  Favorite: defineFavorite(sequelize),
};

// Configurar associações
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;
