import React from "react";
import { IonPhaser } from "@ion-phaser/react";
import { game } from "../phaser/game";

export const GameContainer = (): JSX.Element => {
  return (
    <div className="game-container">
      <IonPhaser className="game-window" game={game} />
    </div>
  );
};
