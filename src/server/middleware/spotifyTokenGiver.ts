import express, { NextFunction, Request, Response } from "express";
import { User, Sessions } from "../database/index";

export const spotifyTokenGiver = express.Router();

spotifyTokenGiver.use(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const data = await User.findOne({
      //     where:
      // })

      next();
    } catch (err) {
      next(err);
    }
  }
);
