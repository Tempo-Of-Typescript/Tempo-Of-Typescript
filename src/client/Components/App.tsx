import React from "react";
import { IonPhaser } from "@ion-phaser/react";
import MainScene from "./phaser/MainScene";

class App extends React.Component {
  state = {
    initialize: true,
    game: {
      type: Phaser.AUTO,
      width: "100%",
      height: "100%",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 },
          debug: true,
        },
        scene: [MainScene],
      },
    },
  };

  render() {
    const { initialize, game } = this.state;
    return <IonPhaser game={game} initialize={initialize} />;
  }
}
