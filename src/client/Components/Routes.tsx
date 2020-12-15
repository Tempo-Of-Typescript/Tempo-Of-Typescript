import React from "react";
import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IRootState as AppState } from "../store/Reducers";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getLoginStatus } from "../store/Reducers/loginReducer/asyncActions";
import { SongSelection } from "./Spotify_Components";
import { LandingPage } from "./LandingPage/";
import Footer from "./Footer";

interface AppProps {
  fetchLoginStatus: () => void;
}

const mapStateToProps = ({
  songQueue,
  loggedInStatus,
  spotifySearch,
}: AppState) => ({
  songQueue,
  loggedInStatus,
  spotifySearch,
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
          <Route exact path="/" component={LandingPage} />
          <Route path="/songQueue" component={SongSelection} />
        </Router>
        <Footer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
