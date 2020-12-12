import React from "react";
import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IRootState as AppState } from "../store/Reducers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getLoginStatus } from "../store/Reducers/loginReducer/asyncActions";
import SpotifyLogin from "./Spotify_Components/SpotifyLogin";
import { Home } from "./Home";
import Footer from "./Footer";
import { GameContainer } from "./Containers/GameContainer";

interface AppProps {
  fetchLoginStatus: () => void;
}

const mapStateToProps = ({ loggedInStatus }: AppState) => ({
  loggedInStatus,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, Action>
) => ({
  fetchLoginStatus: () => dispatch(getLoginStatus()),
});

class Routes extends React.Component<AppProps & AppState> {
  componentDidMount() {
    this.props.fetchLoginStatus();
  }

  render() {
    return (
      <>
        <Router>
          <Route exact path="/" component={GameContainer} />
          <Route path="/spotifyLogin" component={SpotifyLogin} />
        </Router>
        <Footer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
