import express from "express";
import models from "../models/index.js";

const router = express.Router();
const { Genre } = models; // Certifique-se de que Genre está aqui

// Lista todos os gêneros musicais
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Criar um novo gênero
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    res.status(201).json(genre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;