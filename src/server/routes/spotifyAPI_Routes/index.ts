import express from "express";
import { router as searchRoutes } from "./searchRoutes";

const router = express.Router();

router.use("/search", searchRoutes);

export default router;
