import { Sequelize } from "sequelize";
import User from "./user.js";
import Album from "./album.js";
import Artist from "./artist.js";
import Genre from "./genre.js";
import Favorite from "./favorite.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const models = {
  User: User(sequelize),
  Album: Album(sequelize),
  Artist: Artist(sequelize),
  Genre: Genre(sequelize),
  Favorite: Favorite(sequelize),
};

// Configurar associações
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;
