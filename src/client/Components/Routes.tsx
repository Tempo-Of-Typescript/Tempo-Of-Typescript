import React from "react";
import { IonPhaser } from "@ion-phaser/react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "./Footer";
import { game } from "./phaser/game";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div className="game-container">
          <IonPhaser className="game-window" game={game} />
        </div>
        <Footer />
      </Router>
    );
  }
}

export default connect(null, null)(Routes);
