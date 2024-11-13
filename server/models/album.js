import { Model, DataTypes } from "sequelize";

const defineUser = (sequelize) => {
  class Album extends Model {
    static associate(models) {
      // Relacionamento com gêneros
      Album.belongsToMany(models.Genre, {
        through: "AlbumGenres",
        foreignKey: "albumId",
        as: "genres",
      });
      // Relacionamento com artistas
      Album.belongsTo(models.Artist, { foreignKey: "artistId", as: "artist" });
      // Relacionamento com favoritos
      Album.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: "albumId",
        as: "favoritedBy",
      });
    }
  }

  Album.init(
    {
      title: DataTypes.STRING,
      year: DataTypes.INTEGER,
      cover: DataTypes.STRING,
    },
    { sequelize, modelName: "Album" }
  );

  return Album;
};

export default defineUser;
