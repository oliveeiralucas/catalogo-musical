import express from "express";
import models from "../models/index.js";

const router = express.Router();
const { User } = models; // Certifique-se de que User está aqui

// Lista todos os usuários
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Criar um novo usuário
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
