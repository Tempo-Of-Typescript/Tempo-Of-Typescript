import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { IRootState } from "../../store/Reducers/index";

const SpotifyLogin: React.FC<RouteComponentProps> = (): JSX.Element => {
  const dispatch = useDispatch();

  return <div className="spotify-popup-container"></div>;
};

export default withRouter(SpotifyLogin);
