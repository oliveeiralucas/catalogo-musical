import prisma from "../lib/db.js";

const genreController = {
  // Obter todos os gêneros
  async getAll(req, res) {
    try {
      const genres = await prisma.genre.findMany(); // Substitui findAll
      res.json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch genres" });
    }
  },

  // Criar um novo gênero
  async create(req, res) {
    try {
      const { name } = req.body;
      const genre = await prisma.genre.create({
        data: { name }, // Substitui create
      });
      res.status(201).json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create genre" });
    }
  },

  // Obter gênero por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const genre = await prisma.genre.findUnique({
        where: { id: parseInt(id) }, // Substitui findByPk
      });
      if (!genre) return res.status(404).json({ error: "Genre not found" });
      res.json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch genre" });
    }
  },

  // Atualizar gênero por ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      // Verificar se o gênero existe
      const genre = await prisma.genre.findUnique({
        where: { id: parseInt(id) },
      });
      if (!genre) return res.status(404).json({ error: "Genre not found" });

      // Atualizar gênero
      const updatedGenre = await prisma.genre.update({
        where: { id: parseInt(id) },
        data: { name },
      });

      res.json(updatedGenre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update genre" });
    }
  },

  // Deletar gênero por ID
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificar se o gênero existe
      const genre = await prisma.genre.findUnique({
        where: { id: parseInt(id) },
      });
      if (!genre) return res.status(404).json({ error: "Genre not found" });

      // Deletar gênero
      await prisma.genre.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "Genre deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete genre" });
    }
  },
};

export default genreController;
