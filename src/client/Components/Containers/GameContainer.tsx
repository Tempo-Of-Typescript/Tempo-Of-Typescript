import React, { useState } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { game } from "../phaser/game";
import { SongPlayer } from "../Spotify_Components/SongPlayer";
import { ButtonToQueue } from "./buttonToQueue";

export const GameContainer: React.FC = (): JSX.Element => {
  const [showGame, setGame] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    setGame(true);
  };

  return (
    <>
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
      <div>
        <ButtonToQueue />
      </div>
      <div>
        <SongPlayer isPlaying={isPlaying} />
      </div>
    </>
  );
};
