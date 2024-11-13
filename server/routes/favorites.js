import express from "express";
import models from "../models/index.js";

const router = express.Router();
const { Favorite } = models; // Certifique-se de que Favorite está aqui

// Lista todos os favoritos
router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.findAll();
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Adicionar um álbum aos favoritos de um usuário
router.post("/", async (req, res) => {
  try {
    const { userId, albumId } = req.body;
    const favorite = await Favorite.create({ userId, albumId });
    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
