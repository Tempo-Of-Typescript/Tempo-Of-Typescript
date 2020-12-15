import React from "react";
import { useSelector } from "react-redux";
import { IonPhaser } from "@ion-phaser/react";
import { game } from "../phaser/game";
import { IRootState } from "../../store/Reducers/index";
import { ISongQueueState } from "../../store/Reducers/songQueueReducer/type";

export const GameContainer = (): JSX.Element => {
  const { songQueue } = useSelector((state: IRootState) => state);

  const startGameFunctionality = () => {
    return songQueue;
  };

  /*
    pass 'startGameFunctionality' into the phaser game,
    when you call the function it'll return an array that looks like this 
  [
    {timeInMS:120000,BPM: 85},
    {timeInMS:180000,BPM: 125},
    {timeInMS:150000,BPM: 70},
    {timeInMS:90000,BPM: 155},
  ]
    use that to test functionality, you should set it up to an anon function so
    it only gets called when you press the play button
    we may have to change this around once we start testing a few other things,
    lets get the basic functionality started though to make sure it works properly
  */

  return (
    <div className="game-container">
      <IonPhaser className="game-window" game={game} />
    </div>
  );
};
