import models from '../models/index.js';
const { Artist } = models;

const artistController = {
  async getAll(req, res) {
    try {
      const artists = await Artist.findAll();
      res.json(artists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch artists' });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      const artist = await Artist.create({ name });
      res.status(201).json(artist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create artist' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const artist = await Artist.findByPk(id);
      if (!artist) return res.status(404).json({ error: 'Artist not found' });
      res.json(artist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch artist' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const artist = await Artist.findByPk(id);
      if (!artist) return res.status(404).json({ error: 'Artist not found' });

      await artist.update({ name });
      res.json(artist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update artist' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const artist = await Artist.findByPk(id);
      if (!artist) return res.status(404).json({ error: 'Artist not found' });

      await artist.destroy();
      res.json({ message: 'Artist deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete artist' });
    }
  },
};

export default artistController;
