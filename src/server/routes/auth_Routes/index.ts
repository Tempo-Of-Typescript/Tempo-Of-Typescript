import express from "express";

const router = express.Router();

import { router as sessionRouter } from "./sessionProvider/sessionRoutes";
router.use("/sessionProvider", sessionRouter);

export default router;
