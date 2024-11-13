import { Model, DataTypes } from "sequelize";

const defineFavorite = (sequelize) => {
  class Favorite extends Model {}

  Favorite.init(
    {
      userId: DataTypes.INTEGER,
      albumId: DataTypes.INTEGER,
    },
    { sequelize, modelName: "Favorite" }
  );

  return Favorite;
};

export default defineFavorite;
