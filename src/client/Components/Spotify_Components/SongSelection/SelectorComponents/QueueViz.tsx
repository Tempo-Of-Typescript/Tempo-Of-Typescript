import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState as AppState } from "../../../../store/Reducers";
import { QueueItem } from "./QueueItem";
import { ButtonToGame } from "../SelectorComponents/ButtonToGame";

export const QueueViz = (): JSX.Element => {
  const { songQueue } = useSelector((state: AppState) => state);

  if (songQueue.length > 0) {
    return (
      <div className="queue-with-start-butt">
        <div className="song-queue">
          {songQueue.map((ele) => {
            return (
              <div key={`songQ_${ele.id}`}>
                <QueueItem qItem={ele} />
              </div>
            );
          })}
        </div>
        <ButtonToGame />
      </div>
    );
  } else {
    return <div>No Songs in Queue!</div>;
  }
};
