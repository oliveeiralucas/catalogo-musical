import express from "express";
import {
  createDisco,
  getDiscos,
  getDiscoById,
  updateDisco,
  deleteDisco,
  getRandomDiscos,
  getLatestDiscos,
  getPopularDiscos,
} from "../controllers/discoController.js";

const router = express.Router();

router.get("/random", getRandomDiscos);
router.get("/latest", getLatestDiscos);
router.get("/popular", getPopularDiscos);
router.post("/", createDisco);
router.get("/", getDiscos);
router.get("/:id", getDiscoById);
router.put("/:id", updateDisco);
router.delete("/:id", deleteDisco);

export default router;
