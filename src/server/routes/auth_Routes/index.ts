import express from "express";

const router = express.Router();

import { router as spotifyRoutes } from "./spotifyAuth";
router.use("/spotifyRoutes", spotifyRoutes);

export default router;
