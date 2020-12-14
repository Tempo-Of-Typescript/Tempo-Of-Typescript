import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import { blue } from "chalk";

export const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(blue("WE IN IT BOI"));
    const fakeBody = {
      query: "ew",
      type: "track,artist",
      market: "US",
      limit: 20,
      offset: 0,
    };

    const searchURI =
      "https://api.spotify.com/v1/search" +
      "?q=" +
      encodeURIComponent(fakeBody.query) +
      "&type=" +
      encodeURIComponent(fakeBody.type) +
      "&market=" +
      encodeURIComponent(fakeBody.market) +
      "&limit=" +
      encodeURIComponent(fakeBody.limit) +
      "&offset=" +
      encodeURIComponent(fakeBody.offset);

    const authHeader = `Bearer ${req.currentUser.accessToken}`;

    const data = await axios.get(searchURI, {
      headers: {
        "Content-type": "application/json",
        Authorization: authHeader,
      },
    });

    console.log(data);

    res.send(200);
  } catch (err) {
    next(err);
  }
});
