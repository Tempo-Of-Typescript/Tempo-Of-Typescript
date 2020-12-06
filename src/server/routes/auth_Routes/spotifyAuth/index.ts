import express from "express";
import axios from "axios";
import qs from "qs";
import env from "dotenv";
env.config();

export const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send(false);
});

router.get("/login", (req, res, next) => {
  console.log("current user:", req.currentUser.id);
  res.status(200).send({ message: "reeeeeeee" });
  // try {
  //   if (!process.env.REDIRECT_URI) {
  //     throw new Error("process env redirectURI missing");
  //   }
  //   const envRedirectURI: string = process.env.REDIRECT_URI;

  //   const scopes = "user-read-private user-read-email";
  //   const redirectUri =
  //     "https://accounts.spotify.com/authorize" +
  //     "?response_type=code" +
  //     "&client_id=" +
  //     process.env.CLIENT_ID +
  //     (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
  //     "&redirect_uri=" +
  //     encodeURIComponent(envRedirectURI);

  //   res.redirect(redirectUri);
  // } catch (err) {
  //   next(err);
  // }
});

// router.get('/callback', async(req,res,next)=>{
//     const {code} = req.query
//     const body = {
//         code:code,
//         grant_type:'authorization_code',
//         redirect_uri:process.env.REDIRECT_URI,
//         client_id: process.env.CLIENT_ID,
//         client_secret: process.env.CLIENT_SECRET
//     }

//     try{
//         const {access_token, refresh_token} = (await axios.post('https://accounts.spotify.com/api/token',
//             qs.stringify(body),
//             {headers:{
//                 "Content-Type" : "application/x-www-form-urlencoded"
//             }}
//             )).data
//         res.cookie(qs.stringify({access_token,refresh_token}))
//         res.redirect(`http://localhost:8080/`)
//     }catch(err){
//         next(err)
//     }

// })

export default router;
