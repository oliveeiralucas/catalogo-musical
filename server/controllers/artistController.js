import prisma from "../lib/db.js";

const artistController = {
  // Obter todos os artistas
  async getAll(req, res) {
    try {
      const artists = await prisma.artist.findMany({
        include: {
          albums: true, // Inclui álbuns associados ao artista
          disks: true, // Inclui discos associados ao artista
        },
      });
      res.json(artists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch artists" });
    }
  },

  // Criar um novo artista
  async create(req, res) {
    try {
      const { name, albums, disks } = req.body;

      const artist = await prisma.artist.create({
        data: {
          name,
          albums: {
            connect: albums ? albums.map((id) => ({ id })) : [], // Conecta álbuns existentes
          },
          disks: {
            connect: disks ? disks.map((id) => ({ id })) : [], // Conecta discos existentes
          },
        },
      });

      res.status(201).json(artist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create artist" });
    }
  },

  // Obter artista por ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      const artist = await prisma.artist.findUnique({
        where: { id: parseInt(id) },
        include: {
          albums: true, // Inclui álbuns associados
          disks: true, // Inclui discos associados
        },
      });

      if (!artist) return res.status(404).json({ error: "Artist not found" });

      res.json(artist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch artist" });
    }
  },

  // Atualizar artista por ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, albums, disks } = req.body;

      const artist = await prisma.artist.findUnique({
        where: { id: parseInt(id) },
      });

      if (!artist) return res.status(404).json({ error: "Artist not found" });

      const updatedArtist = await prisma.artist.update({
        where: { id: parseInt(id) },
        data: {
          name,
          albums: {
            set: albums ? albums.map((id) => ({ id })) : [], // Atualiza álbuns relacionados
          },
          disks: {
            set: disks ? disks.map((id) => ({ id })) : [], // Atualiza discos relacionados
          },
        },
      });

      res.json(updatedArtist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update artist" });
    }
  },

  // Deletar artista por ID
  async delete(req, res) {
    try {
      const { id } = req.params;

      const artist = await prisma.artist.findUnique({
        where: { id: parseInt(id) },
      });

      if (!artist) return res.status(404).json({ error: "Artist not found" });

      await prisma.artist.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "Artist deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete artist" });
    }
  },
};

export default artistController;
