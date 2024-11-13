import express from "express";
import userRoutes from "./users.js";
import albumRoutes from "./albums.js";
import artistRoutes from "./artists.js";
import genreRoutes from "./genres.js";
import favoriteRoutes from "./favorites.js";
import searchRoutes from "./search.js";
import diskRoutes from "./disks.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/albums", albumRoutes);
router.use("/artists", artistRoutes);
router.use("/genres", genreRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/search", searchRoutes);
router.use("/disks", diskRoutes);

export default router;
