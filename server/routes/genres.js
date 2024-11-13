import express from "express";
import genreController from "../controllers/genreController.js";

const router = express.Router();

router.get("/", genreController.getAll);
router.post("/", genreController.create);
router.get("/:id", genreController.getById);
router.put("/:id", genreController.update);
router.delete("/:id", genreController.delete);

export default router;
