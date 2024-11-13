import prisma from "../lib/db.js";

const favoriteController = {
  // Obter todos os favoritos com relação aos usuários e álbuns
  async getAll(req, res) {
    try {
      const favorites = await prisma.favorite.findMany({
        include: {
          user: true, // Inclui os dados do usuário relacionado
          album: {
            include: {
              genres: true, // Inclui os gêneros do álbum
              disks: { include: { artist: true } }, // Inclui os discos e seus artistas
              artist: true, // Inclui o artista do álbum
            },
          },
        },
      });
      res.json(favorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  },

  // Criar um novo favorito
  async create(req, res) {
    try {
      const { userId, albumId } = req.body;

      // Verificar se o álbum e o usuário existem
      const userExists = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      const albumExists = await prisma.album.findUnique({
        where: { id: parseInt(albumId) },
      });

      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!albumExists) {
        return res.status(404).json({ error: "Album not found" });
      }

      const favorite = await prisma.favorite.create({
        data: {
          userId,
          albumId,
        },
      });
      res.status(201).json(favorite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create favorite" });
    }
  },

  // Deletar um favorito por ID
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificar se o favorito existe
      const favorite = await prisma.favorite.findUnique({
        where: { id: parseInt(id) },
      });
      if (!favorite)
        return res.status(404).json({ error: "Favorite not found" });

      // Deletar favorito
      await prisma.favorite.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "Favorite deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete favorite" });
    }
  },
};

export default favoriteController;
