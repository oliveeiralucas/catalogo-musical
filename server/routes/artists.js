import express from "express";
import artistController from "../controllers/artistController.js";

const router = express.Router();

router.get("/", artistController.getAll);
router.post("/", artistController.create);
router.get("/:id", artistController.getById);
router.put("/:id", artistController.update);
router.delete("/:id", artistController.delete);

export default router;
