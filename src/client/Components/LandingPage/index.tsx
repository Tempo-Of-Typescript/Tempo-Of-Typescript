import React from "react";
import { useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IRootState as AppState } from "../../store/store";

const landingPage: React.FC<RouteComponentProps> = ({
  history,
}): JSX.Element => {
  const { loggedInStatus } = useSelector((state: AppState) => state);
  const linkTo = loggedInStatus ? "/toQueueRoute" : "/auth/spotifyRoutes/login";
  const buttonText = loggedInStatus ? "Pick your songs!" : "Login To Spotify!";

  return (
    <div>
      <h1>Some opening blurb about welcome to the game</h1>
      <div>
        {loggedInStatus ? (
          <button onClick={() => history.push(linkTo)}>{buttonText}</button>
        ) : (
          <a href={linkTo}>
            <button>{buttonText}</button>
          </a>
        )}
      </div>
    </div>
  );
};

export const LandingPage = withRouter(landingPage);
