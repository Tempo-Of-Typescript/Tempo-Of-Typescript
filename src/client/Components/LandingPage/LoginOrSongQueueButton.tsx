import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps {
  linkTo: string;
  buttonText: string;
}

const loginOrSongQueueButton: React.FC<IProps> = ({
  history,
  linkTo,
  buttonText,
}): JSX.Element => {
  return (
    <a href={linkTo}>{buttonText}</a>
    // <button onClick={()=>history.push(linkTo)}>{buttonText}</button>
  );
};

export const LoginOrSongQueueButton = withRouter(loginOrSongQueueButton);
