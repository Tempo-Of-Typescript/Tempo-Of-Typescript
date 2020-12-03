import React from "react";
import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IRootState as AppState } from "../store/Reducers/index";
import { getSessionsTokens } from "../store/Reducers/tokenReducer/asyncActions";
import { GameContainer } from "./Containers/GameContainer";
import { RoutesContainer } from "./Containers/RoutesContainer";
import Footer from "./Footer";

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
      <>
        <RoutesContainer />
        <GameContainer />
        <Footer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
