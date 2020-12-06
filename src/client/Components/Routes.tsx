import React from "react";
import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { GameContainer } from "./Containers/GameContainer";
import { SpotifyContainer } from "./Containers/SpotifyContainer";
import { IRootState as AppState } from "../store/Reducers";
import { getLoginStatus } from "../store/Reducers/loginReducer/asyncActions";
import Footer from "./Footer";

interface AppProps {
  fetchLoginStatus: () => void;
}

const mapStateToProps = (state: AppState) => ({
  loggedinStatus: state.loggedinStatus,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, Action>
) => ({
  fetchLoginStatus: () => dispatch(getLoginStatus()),
});

class Routes extends React.Component<AppProps> {
  componentDidMount() {
    this.props.fetchLoginStatus();
  }

  render() {
    return (
      <>
        <SpotifyContainer />
        {/* <GameContainer /> */}
        <Footer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
