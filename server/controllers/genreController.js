import models from '../models/index.js';
const { Genre } = models;

const genreController = {
  async getAll(req, res) {
    try {
      const genres = await Genre.findAll();
      res.json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch genres' });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      const genre = await Genre.create({ name });
      res.status(201).json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create genre' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const genre = await Genre.findByPk(id);
      if (!genre) return res.status(404).json({ error: 'Genre not found' });
      res.json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch genre' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const genre = await Genre.findByPk(id);
      if (!genre) return res.status(404).json({ error: 'Genre not found' });

      await genre.update({ name });
      res.json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update genre' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const genre = await Genre.findByPk(id);
      if (!genre) return res.status(404).json({ error: 'Genre not found' });

      await genre.destroy();
      res.json({ message: 'Genre deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete genre' });
    }
  },
};

export default genreController;
