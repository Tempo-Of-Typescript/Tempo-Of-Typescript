import express from "express";
import auth from "./auth_Routes/";
import spotify from "./spotifyAPI_Routes";

const router = express.Router();

router.use("/auth", auth);
router.use("/api/spotify", spotify);

export default router;
