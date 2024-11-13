import express from "express";
import userRoutes from "./users.js";
import albumRoutes from "./albums.js";
import artistRoutes from "./artists.js";
import genreRoutes from "./genres.js";
import favoriteRoutes from "./favorites.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/albums", albumRoutes);
router.use("/artists", artistRoutes);
router.use("/genres", genreRoutes);
router.use("/favorites", favoriteRoutes);

export default router;
