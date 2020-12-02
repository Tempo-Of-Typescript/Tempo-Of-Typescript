import React from "react";
import { Action } from "redux";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { IRootState as AppState } from "../store/Reducers/index";
import { getSessionsTokens } from "../store/Reducers/tokenReducer/asyncActions";
import { SpotifyLogin } from "./Spotify_Components/SpotifyLogin";

interface AppProps {
  fetchTokens: () => void;
}

const mapStateToProps = (state: AppState) => ({
  tokens: state.spotifyAuthTokens,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, Action>
) => ({
  fetchTokens: () => dispatch(getSessionsTokens()),
});

class Routes extends React.Component<AppProps, AppState> {
  componentDidMount() {
    this.props.fetchTokens();
  }

  render() {
    return (
      <Router>
        <SpotifyLogin />
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
