import prisma from "../lib/db.js";

const diskController = {
  // Obter todos os discos
  async getAll(req, res) {
    try {
      const disks = await prisma.disk.findMany({
        include: { albums: true, artist: true }, // Inclui os relacionamentos
      });
      res.json(disks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch disks" });
    }
  },

  // Criar um novo disco
  async create(req, res) {
    try {
      const { title, coverImage, artistId, albums } = req.body;
      const newDisk = await prisma.disk.create({
        data: {
          title,
          coverImage,
          artistId,
          albums: { connect: albums.map((id) => ({ id })) }, // Conecta álbuns existentes
        },
      });
      res.status(201).json(newDisk);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create disk" });
    }
  },

  // Obter um disco por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const disk = await prisma.disk.findUnique({
        where: { id: parseInt(id) },
        include: { albums: true, artist: true }, // Inclui os relacionamentos
      });
      if (!disk) return res.status(404).json({ error: "Disk not found" });
      res.json(disk);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch disk" });
    }
  },

  // Atualizar um disco existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, coverImage, artistId, albums } = req.body;

      const disk = await prisma.disk.findUnique({
        where: { id: parseInt(id) },
      });
      if (!disk) return res.status(404).json({ error: "Disk not found" });

      const updatedDisk = await prisma.disk.update({
        where: { id: parseInt(id) },
        data: {
          title,
          coverImage,
          artistId,
          albums: {
            set: albums.map((id) => ({ id })), // Atualiza a relação com os álbuns
          },
        },
      });

      res.json(updatedDisk);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update disk" });
    }
  },

  // Deletar um disco por ID
  async delete(req, res) {
    try {
      const { id } = req.params;

      const disk = await prisma.disk.findUnique({
        where: { id: parseInt(id) },
      });
      if (!disk) return res.status(404).json({ error: "Disk not found" });

      await prisma.disk.delete({ where: { id: parseInt(id) } });

      res.json({ message: "Disk deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete disk" });
    }
  },
};

export default diskController;
