import React from "react";
import { Action } from "redux";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { IRootState as AppState } from "../store/Reducers/index";
import { getSessionsTokens } from "../store/Reducers/tokenReducer/asyncActions";

interface AppProps {
  fetchTokens: () => void;
}

const mapStateToProps = (state: AppState) => ({
  token: state.token,
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
        <div>We started capstone!! Woohoo</div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
