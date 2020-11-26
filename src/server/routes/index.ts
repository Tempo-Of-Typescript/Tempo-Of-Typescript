import express from "express";
import auth from "./spotifyAuth";
const router = express.Router();

router.use("/auth", auth);

export default router;
