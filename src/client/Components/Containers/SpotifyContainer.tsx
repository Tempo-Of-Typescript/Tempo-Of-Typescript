// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { HashRouter as Router, Route, Switch } from "react-router-dom";
// import { IRootState } from "../../store/Reducers";
// import { SpotifyLogin } from "../Spotify_Components/SpotifyLogin";
// import axios from "axios";

// export const SpotifyContainer: React.FC = (): JSX.Element => {
//   const { loggedInStatus } = useSelector((state: IRootState) => state);

//   const [toggleLoginScreen, toggleScreen] = useState(false);

//   if (loggedInStatus) {
//     return (
//       <div className="spotify-container">
//         {/*
//         <Controls />
//         <Queue />
//         <SongSearcher />
//         */}
//       </div>
//     );
//   } else {
//     return (
//       <>
//         <div className="spotify-container">
//           Currently not logged in!
//           <button
//             onClick={() => {
//               axios.get("/auth/spotifyRoutes/login");
//             }}
//           >
//             Click To Login
//           </button>
//         </div>
//         {toggleLoginScreen ? <SpotifyLogin /> : null}
//       </>
//     );
//   }
// };
