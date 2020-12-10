import express from "express";
import auth from "./auth_Routes/";
const router = express.Router();

router.use("/auth", auth);

export default router;
