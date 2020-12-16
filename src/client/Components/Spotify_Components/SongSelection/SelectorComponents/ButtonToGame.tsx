import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const buttonToGame: React.FC<RouteComponentProps> = ({
  history,
}): JSX.Element => {
  return (
    <button
      className="nes-btn is-success"
      onClick={() => history.push("/playGame")}
    >
      Start Game!
    </button>
  );
};

export const ButtonToGame = withRouter(buttonToGame);
