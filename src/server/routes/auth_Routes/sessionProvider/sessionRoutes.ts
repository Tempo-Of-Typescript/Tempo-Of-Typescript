import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User, Sessions } from "../../../database/index";
import { blue } from "chalk";

export const router = express.Router();

router.post(
  "/pageLoad",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("reeee", req.cookies.sessionId);
      if (req.cookies.sessionId) {
        const foundSessions = await Sessions.findOne({
          where: {
            sessionUUID: req.cookies.sessionId,
          },
        });
        console.log(foundSessions);
        if (foundSessions) {
          const foundUser = await User.findOne({
            where: {
              id: foundSessions.userId,
            },
          });
          if (foundUser) {
            res.send({
              authToken: foundUser.authToken,
              refreshToken: foundUser.refreshToken,
            });
          }
        } else {
          res.status(404);
          next(new Error("User not found"));
        }
      } else {
        const newUserUUID = uuidv4();
        const newUser = await User.create({
          name: newUserUUID,
          authToken: "spotify not setup",
          refreshToken: "spotify not setup",
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
