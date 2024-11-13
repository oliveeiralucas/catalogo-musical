import { Model, DataTypes } from "sequelize";

const defineGenre = (sequelize) => {
  class Genre extends Model {
    static associate(models) {
      // Relacionamento com álbuns
      Genre.belongsToMany(models.Album, {
        through: "AlbumGenres",
        foreignKey: "genreId",
        as: "albums",
      });
    }
  }

  Genre.init(
    {
      name: DataTypes.STRING,
    },
    { sequelize, modelName: "Genre" }
  );

  return Genre;
};

export default defineGenre;
