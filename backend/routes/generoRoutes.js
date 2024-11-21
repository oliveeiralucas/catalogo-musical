import express from "express";
import {
  createGenero,
  getGeneros,
  updateGenero,
  deleteGenero,
} from "../controllers/generoController.js";

const router = express.Router();

router.post("/", createGenero);
router.get("/", getGeneros);
router.put("/:id", updateGenero);
router.delete("/:id", deleteGenero);

export default router;
