import express from "express";
import ArtistaRoutes from "./artistaRoutes.js";
import DiscoRoutes from "./discoRoutes.js";
import faixaRoutes from "./faixaRoutes.js";
import generoRoutes from "./generoRoutes.js";

const router = express.Router();

// Definindo as rotas principais
router.use("/artistas", ArtistaRoutes);
router.use("/discos", DiscoRoutes);
router.use("/faixas", faixaRoutes);
router.use("/generos", generoRoutes);

export default router;
