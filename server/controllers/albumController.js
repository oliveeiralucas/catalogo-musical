import models from "../models/index.js";
const { Album } = models;

const albumController = {
  async getAll(req, res) {
    try {
      const albums = await Album.findAll();
      res.json(albums);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch albums" });
    }
  },

  async create(req, res) {
    try {
      const { title, year, cover, artistId } = req.body;
      const album = await Album.create({ title, year, cover, artistId });
      res.status(201).json(album);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create album" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const album = await Album.findByPk(id);
      if (!album) return res.status(404).json({ error: "Album not found" });
      res.json(album);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch album" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, year, cover, artistId } = req.body;
      const album = await Album.findByPk(id);
      if (!album) return res.status(404).json({ error: "Album not found" });

      await album.update({ title, year, cover, artistId });
      res.json(album);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update album" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const album = await Album.findByPk(id);
      if (!album) return res.status(404).json({ error: "Album not found" });

      await album.destroy();
      res.json({ message: "Album deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete album" });
    }
  },
};

export default albumController;
