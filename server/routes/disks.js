import express from "express";
import diskController from "../controllers/diskController.js";

const router = express.Router();

router.get("/", diskController.getAll);
router.post("/", diskController.create);
router.get("/:id", diskController.getById);
router.put("/:id", diskController.update);
router.delete("/:id", diskController.delete);

export default router;
