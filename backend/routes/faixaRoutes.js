import express from "express";
import {
  createFaixa,
  getFaixas,
  updateFaixa,
  deleteFaixa,
} from "../controllers/faixaController.js";

const router = express.Router();

router.post("/", createFaixa);
router.get("/", getFaixas);
router.put("/:id", updateFaixa);
router.delete("/:id", deleteFaixa);

export default router;
