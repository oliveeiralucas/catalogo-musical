import { Model, DataTypes } from "sequelize";

const defineArtist = (sequelize) => {
  class Artist extends Model {
    static associate(models) {
      // Relacionamento com álbuns
      Artist.hasMany(models.Album, { foreignKey: "artistId", as: "albums" });
    }
  }

  Artist.init(
    {
      name: DataTypes.STRING,
    },
    { sequelize, modelName: "Artist" }
  );

  return Artist;
};

export default defineArtist;
