import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const buttonToQueue: React.FC<RouteComponentProps> = ({
  history,
}): JSX.Element => {
  return (
    <button
      className="nes-btn is-success"
      onClick={() => history.push("/songQueue")}
    >
      Choose New Songs!
    </button>
  );
};

export const ButtonToQueue = withRouter(buttonToQueue);
