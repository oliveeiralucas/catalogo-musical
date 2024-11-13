import express from "express";
import models from "../models/index.js";

const router = express.Router();
const { Artist } = models; // Certifique-se de que Artist está aqui

// Lista todos os artistas
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Criar um novo artista
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const artist = await Artist.create({ name });
    res.status(201).json(artist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
