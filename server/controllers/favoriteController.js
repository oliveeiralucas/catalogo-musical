import models from "../models/index.js";
const { Favorite, User, Album } = models;

const favoriteController = {
  async getAll(req, res) {
    try {
      const favorites = await Favorite.findAll({
        include: [
          { model: User, as: "user" },
          { model: Album, as: "album" },
        ],
      });
      res.json(favorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  },

  async create(req, res) {
    try {
      const { userId, albumId } = req.body;
      const favorite = await Favorite.create({ userId, albumId });
      res.status(201).json(favorite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create favorite" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const favorite = await Favorite.findByPk(id);
      if (!favorite)
        return res.status(404).json({ error: "Favorite not found" });

      await favorite.destroy();
      res.json({ message: "Favorite deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete favorite" });
    }
  },
};

export default favoriteController;
