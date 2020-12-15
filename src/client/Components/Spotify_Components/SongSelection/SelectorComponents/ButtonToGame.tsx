import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const buttonToGame: React.FC<RouteComponentProps> = ({
  history,
}): JSX.Element => {
  return <button onClick={() => history.push("/playGame")}>Start Game!</button>;
};

export const ButtonToGame = withRouter(buttonToGame);
