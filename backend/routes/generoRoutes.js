import express from "express";
import {
  createGenero,
  getGeneros,
  getGeneroById,
  updateGenero,
  deleteGenero,
} from "../controllers/generoController.js";

const router = express.Router();

router.post("/", createGenero);
router.get("/", getGeneros);
router.get("/:id", getGeneroById);
router.put("/:id", updateGenero);
router.delete("/:id", deleteGenero);

export default router;
