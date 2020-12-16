import express, { Request, Response, NextFunction } from "express";
import axios from "axios";

export const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchURI =
      "https://api.spotify.com/v1/search" +
      "?q=" +
      encodeURIComponent(req.body.query) +
      "&type=" +
      encodeURIComponent(req.body.type) +
      "&market=" +
      encodeURIComponent(req.body.market) +
      "&limit=" +
      encodeURIComponent(req.body.limit) +
      "&offset=" +
      encodeURIComponent(req.body.offset);

    const authHeader = `Bearer ${req.currentUser.accessToken}`;

    const { data } = await axios.get(searchURI, {
      headers: {
        "Content-type": "application/json",
        Authorization: authHeader,
      },
    });

    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/getAudioFeature/:trackID",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trackID } = req.params;
      const searchURI =
        "https://api.spotify.com/v1/audio-features/" +
        encodeURIComponent(trackID);
      const authHeader = `Bearer ${req.currentUser.accessToken}`;

      console.log(searchURI);

      const { data } = await axios.get(searchURI, {
        headers: {
          "Content-type": "application/json",
          Authorization: authHeader,
        },
      });

      const sendBPM = { BPM: Math.floor(data.tempo) };
      res.send(sendBPM);
    } catch (err) {
      next(err);
    }
  }
);
