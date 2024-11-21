import express from "express";
import {
  createArtista,
  getArtistas,
  getArtistaById,
  updateArtista,
  deleteArtista,
} from "../controllers/artistaController.js";

const router = express.Router();

router.post("/", createArtista);
router.get("/", getArtistas);
router.get("/:id", getArtistaById);
router.put("/:id", updateArtista);
router.delete("/:id", deleteArtista);

export default router;
