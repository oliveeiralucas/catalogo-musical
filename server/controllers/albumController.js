import prisma from "../lib/db.js";

const albumController = {
  // Obter todos os álbuns
  async getAll(req, res) {
    try {
      const albums = await prisma.album.findMany({
        include: {
          genres: true, // Inclui gêneros associados
          disks: { include: { artist: true } }, // Inclui discos e os artistas dos discos
          artist: true, // Inclui o artista do álbum
        },
      });
      res.json(albums);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch albums" });
    }
  },

  // Criar um novo álbum
  async create(req, res) {
    try {
      const {
        title,
        releaseYear,
        coverImage,
        artistId,
        description,
        genres,
        disks,
      } = req.body;

      const album = await prisma.album.create({
        data: {
          title,
          releaseYear,
          coverImage,
          description,
          artistId,
          genres: {
            connect: genres.map((id) => ({ id })), // Conecta gêneros existentes
          },
          disks: {
            create: disks.map((disk) => ({
              title: disk.title,
              coverImage: disk.coverImage,
              artistId: disk.artistId, // Artista associado ao disco
            })),
          },
        },
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
        where: { id: parseInt(id) },
        include: {
          genres: true, // Inclui gêneros
          disks: { include: { artist: true } }, // Inclui discos e os artistas dos discos
          artist: true, // Inclui o artista do álbum
        },
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
      const {
        title,
        releaseYear,
        coverImage,
        artistId,
        description,
        genres,
        disks,
      } = req.body;

      const album = await prisma.album.findUnique({
        where: { id: parseInt(id) },
      });

      if (!album) return res.status(404).json({ error: "Album not found" });

      const updatedAlbum = await prisma.album.update({
        where: { id: parseInt(id) },
        data: {
          title,
          releaseYear,
          coverImage,
          description,
          artistId,
          genres: {
            set: genres.map((id) => ({ id })), // Atualiza gêneros relacionados
          },
          disks: {
            deleteMany: {}, // Remove todos os discos relacionados
            create: disks.map((disk) => ({
              title: disk.title,
              coverImage: disk.coverImage,
              artistId: disk.artistId,
            })),
          },
        },
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

      const album = await prisma.album.findUnique({
        where: { id: parseInt(id) },
      });

      if (!album) return res.status(404).json({ error: "Album not found" });

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
