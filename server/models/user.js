import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const defineUser = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Relacionamento com favoritos (álbuns)
      User.belongsToMany(models.Album, {
        through: models.Favorite,
        foreignKey: "userId",
        as: "favoriteAlbums",
      });
    }

    // Método para comparar senha criptografada
    static async isPasswordValid(plainPassword, hashedPassword) {
      return await bcrypt.compare(plainPassword, hashedPassword);
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        // Hook para criptografar a senha antes de salvar
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};

export default defineUser;
