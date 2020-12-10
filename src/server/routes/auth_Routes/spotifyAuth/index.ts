import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import qs from "qs";
import env from "dotenv";
import { blue } from "chalk";
import { User } from "../../../database/models";
env.config();

export const router = express.Router();

router.get(
  "/loginStatus",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.currentUser)
      // req.currentUser.accessToken = 'asdasdgdsfgadsfg'
      await req.currentUser.save();
      // console.log(req.currentUser)
      if (req.currentUser.accessToken !== "not logged in") {
        res.send(true);
      } else {
        res.send(false);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.REDIRECT_URI) {
      throw new Error("process env redirectURI missing");
    }
    const envRedirectURI: string = process.env.REDIRECT_URI;
    const scopes = "user-read-private user-read-email";
    const redirectUri =
      "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      process.env.CLIENT_ID +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(envRedirectURI);
    res.redirect(redirectUri);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("in callback");
    console.log(req.cookies);
    const { code } = req.query;
    const body = {
      code: code,
      grant_type: "authorization_code",
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    };

    try {
      const { access_token, refresh_token } = (
        await axios.post(
          "https://accounts.spotify.com/api/token",
          qs.stringify(body),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
      ).data;
      console.log(access_token);
      req.currentUser.refreshToken = refresh_token + "";
      req.currentUser.accessToken = access_token + "";
      await req.currentUser.save();
      res.cookie("sessionId", req.body.sessionId, {
        httpOnly: true,
        sameSite: true,
      });
      console.log("123123123");
      res.cookie("sessionId", req.cookies.sessionId);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
);

export default router;
