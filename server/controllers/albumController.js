import prisma from "../lib/db.js";

const albumController = {
  // Obter todos os álbuns
  async getAll(req, res) {
    try {
      const albums = await prisma.album.findMany(); // Substitui findAll
      res.json(albums);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch albums" });
    }
  },

  // Criar um novo álbum
  async create(req, res) {
    try {
      const { title, releaseYear, coverImage, artistId } = req.body;
      const album = await prisma.album.create({
        data: {
          title,
          releaseYear,
          coverImage,
          artistId,
        }, // Substitui create
      });
      res.status(201).json(album);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create album" });
    }
  },

  // Obter álbum por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const album = await prisma.album.findUnique({
        where: { id: parseInt(id) }, // Substitui findByPk
      });
      if (!album) return res.status(404).json({ error: "Album not found" });
      res.json(album);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch album" });
    }
  },

  // Atualizar álbum por ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, releaseYear, coverImage, artistId } = req.body;

      // Verificar se o álbum existe
      const album = await prisma.album.findUnique({
        where: { id: parseInt(id) },
      });
      if (!album) return res.status(404).json({ error: "Album not found" });

      // Atualizar álbum
      const updatedAlbum = await prisma.album.update({
        where: { id: parseInt(id) },
        data: { title, releaseYear, coverImage, artistId },
      });

      res.json(updatedAlbum);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update album" });
    }
  },

  // Deletar álbum por ID
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificar se o álbum existe
      const album = await prisma.album.findUnique({
        where: { id: parseInt(id) },
      });
      if (!album) return res.status(404).json({ error: "Album not found" });

      // Deletar álbum
      await prisma.album.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "Album deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete album" });
    }
  },
};

export default albumController;
