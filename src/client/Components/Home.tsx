import React from "react";
import { IRootState as AppState } from "../store/Reducers";
import { useSelector } from "react-redux";
import { GameContainer } from "./Containers/GameContainer";
import { SpotifyContainer } from "./Containers/SpotifyContainer";
import { Link } from "react-router-dom";

export const Home: React.FC = (): JSX.Element => {
  const { loggedInStatus } = useSelector((state: AppState) => state);
  console.log("logged status", loggedInStatus);
  if (loggedInStatus) {
    return (
      <>
        <SpotifyContainer />
        <GameContainer />
      </>
    );
  } else {
    return (
      <div>
        You need to login to spotify! Please click below!
        <Link to="/spotifyLogin">Login!</Link>
      </div>
    );
  }
};
