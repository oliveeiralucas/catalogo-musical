import express from "express";
import favoriteController from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/", favoriteController.getAll);
router.post("/", favoriteController.create);
router.delete("/:id", favoriteController.delete);

export default router;
