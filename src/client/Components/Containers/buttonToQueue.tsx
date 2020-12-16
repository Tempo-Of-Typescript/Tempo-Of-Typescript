import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const buttonToQueue: React.FC<RouteComponentProps> = ({
  history,
}): JSX.Element => {
  return (
    <button
      className="nes-btn is-warning"
      onClick={() => history.push("/songQueue")}
    >
      Return to Queue!
    </button>
  );
};

export const ButtonToQueue = withRouter(buttonToQueue);
