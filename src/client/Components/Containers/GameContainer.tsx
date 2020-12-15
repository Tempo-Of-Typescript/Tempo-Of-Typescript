import React, { useState } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { game } from "../phaser/game";
import { SongPlayer } from "../Spotify_Components/SongPlayer";

export const GameContainer: React.FC = (): JSX.Element => {
  const [showGame, setGame] = useState(false);

  const startGame = () => {
    //make it so song starts playing
    setGame(true);
  };

  return (
    <>
      <div>
        <SongPlayer />
      </div>
      {showGame ? (
        <div className="game-container">
          <IonPhaser className="game-window" game={game} />
        </div>
      ) : (
        <div className="game-container">
          Game Stuff
          <button onClick={() => startGame()}>Start Game!</button>
        </div>
      )}
    </>
  );
};
