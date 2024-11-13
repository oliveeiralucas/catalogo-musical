import express from "express";
import albumController from "../controllers/albumController.js";

const router = express.Router();

router.get("/", albumController.getAll);
router.post("/", albumController.create);
router.get("/:id", albumController.getById);
router.put("/:id", albumController.update);
router.delete("/:id", albumController.delete);

export default router;
