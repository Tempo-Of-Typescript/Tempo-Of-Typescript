import React from "react";
import { IonPhaser } from "@ion-phaser/react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { game } from "./phaser/game";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div>We started capstone!! Woohoo</div>
        <IonPhaser game={game} />
      </Router>
    );
  }
}

export default connect(null, null)(Routes);
