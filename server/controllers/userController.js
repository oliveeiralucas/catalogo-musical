import models from "../models/index.js";
const { User } = models;

const userController = {
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: "User not found" });

      await user.update({ name, email, password });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: "User not found" });

      await user.destroy();
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};

export default userController;
