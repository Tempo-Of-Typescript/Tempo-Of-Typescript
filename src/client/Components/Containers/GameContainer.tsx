import React, { useState } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { game } from "../phaser/game";
import { SongPlayer } from "../Spotify_Components/SongPlayer";
import { ButtonToQueue } from "./buttonToQueue";
import { GameInstructions } from "../LandingPage/gameInstructions";

export const GameContainer: React.FC = (): JSX.Element => {
  const [showGame, setGame] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    setGame(true);
  };

  return (
    <div className="game-page">
      <h1>Rhythm Overflow</h1>
      <h2>Tempo of TypeScript</h2>
      {showGame ? (
        <div className="game-container">
          <IonPhaser className="game-window" game={game} />
        </div>
      ) : (
        <div className="game-container">
          <button className="nes-btn is-success" onClick={() => startGame()}>
            Start Game!
          </button>
        </div>
      )}
      <div>
        <ButtonToQueue />
      </div>
      <GameInstructions />
      <div className="music-player">
        <SongPlayer isPlaying={isPlaying} />
      </div>
    </div>
  );
};
