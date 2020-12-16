import React from "react";
import { useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IRootState as AppState } from "../../store/store";
import { LoginInstructions } from "./instructions";
import { GameInstructions } from "./gameInstructions";

const landingPage: React.FC<RouteComponentProps> = ({
  history,
}): JSX.Element => {
  const { loggedInStatus } = useSelector((state: AppState) => state);
  const linkTo = loggedInStatus ? "/songQueue" : "/auth/spotifyRoutes/login";
  const buttonText = loggedInStatus ? "Pick your songs!" : "Login To Spotify!";

  return (
    <div className="landing-page">
      <h1>Rhythm Overflow</h1>
      <h2>Tempo of TypeScript</h2>
      <div className="pick-songs-button">
        {loggedInStatus ? (
          <button
            className="nes-btn is-primary"
            onClick={() => history.push(linkTo)}
          >
            {buttonText}
          </button>
        ) : (
          <a href={linkTo}>
            <button className="nes-btn is-success">{buttonText}</button>
          </a>
        )}
      </div>
      <LoginInstructions />
      <GameInstructions />
    </div>
  );
};

export const LandingPage = withRouter(landingPage);
