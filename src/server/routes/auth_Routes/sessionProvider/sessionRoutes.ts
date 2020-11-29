import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User, Sessions } from "../../../database/index";
import { blue } from "chalk";

export const router = express.Router();

router.post(
  "/pageLoad",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.cookies.length > 0 && req.cookies) {
        const foundSessions = await Sessions.findOne({
          where: {
            sessionUUID: req.cookies.sessionId,
          },
        });
        if (foundSessions) {
          //sending back a users tokens and shit
          res.sendStatus(200);
        } else {
          res.status(404);
          next(new Error("User not found"));
        }
      } else {
        const newUserUUID = uuidv4();
        const newUser = await User.create({
          name: newUserUUID,
          authToken: "something bish",
        });
        const newSession = await Sessions.create({ sessionUUID: newUserUUID });
        await newUser.$add("Sessions", newSession);
        res.cookie("sessionId", newUserUUID, {
          httpOnly: true,
          sameSite: true,
        });
        const sendToClient = {
          authToken: newUser.authToken,
          refreshToken: newUser.refreshToken,
        };
        res.status(201).send(sendToClient);
      }
    } catch (err) {
      next(err);
    }
  }
);
