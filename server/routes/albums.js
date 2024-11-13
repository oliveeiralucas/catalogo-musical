import express from "express";
import models from "../models/index.js";

const router = express.Router();
const { Album } = models; // Certifique-se de que Album está aqui

// Lista todos os álbuns
router.get("/", async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Criar um novo álbum
router.post("/", async (req, res) => {
  try {
    const { title, year, cover, artistId } = req.body;
    const album = await Album.create({ title, year, cover, artistId });
    res.status(201).json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
