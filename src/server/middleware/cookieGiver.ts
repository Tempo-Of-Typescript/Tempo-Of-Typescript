import express, { NextFunction, Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { User, Sessions } from "../database/index";
import { blue } from "chalk";

export const cookieGiver = express.Router();

cookieGiver.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.cookies.sessionId) {
      const foundSession = await Sessions.findOne({
        where: {
          sessionUUID: req.cookies.sessionId,
        },
      });
      const userId = foundSession?.userId;
      const currentUser = await User.findByPk(userId);

      if (currentUser) {
        req.currentUser = currentUser;
      } else {
        throw Error("could not find user");
      }

      next();
    } else {
      const newUserUUID = uuidv4();
      const newUser = await User.create({
        name: newUserUUID,
      });
      const newSession = await Sessions.create({ sessionUUID: newUserUUID });
      await newUser.$add("Sessions", newSession);
      res.cookie("sessionId", newUserUUID, {
        httpOnly: true,
        sameSite: true,
      });
      console.log(newUser);
      req.currentUser = newUser;
      next();
    }
  } catch (err) {
    next(err);
  }
});
