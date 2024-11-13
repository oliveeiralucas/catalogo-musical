import prisma from "../lib/db.js";

const userController = {
  // Obter todos os usuários
  async getAll(req, res) {
    try {
      const users = await prisma.user.findMany(); // Prisma substitui findAll
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  // Criar um novo usuário
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await prisma.user.create({
        data: { name, email, password }, // Prisma substitui create
      });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  // Obter usuário por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }, // Prisma substitui findByPk
      });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },

  // Atualizar usuário por ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      // Verificar se o usuário existe
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!user) return res.status(404).json({ error: "User not found" });

      // Atualizar usuário
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email, password },
      });

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  // Deletar usuário por ID
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificar se o usuário existe
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!user) return res.status(404).json({ error: "User not found" });

      // Deletar usuário
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};

export default userController;
