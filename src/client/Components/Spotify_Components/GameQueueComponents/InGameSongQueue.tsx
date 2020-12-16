import React from "react";
import { useSelector } from "react-redux";
import { IRootState as AppState } from "../../../store/Reducers";
import { InGameQueueItem } from "./InGameQueueItem";

export const InGameSongQueue: React.FC = (): JSX.Element => {
  const { songQueue } = useSelector((state: AppState) => state);

  if (songQueue.length > 0) {
    return (
      <div className="in-game-queue">
        <h3>{`Current Queue (${songQueue.length} Songs):`}</h3>
        <div className="in-game-song-queue">
          {songQueue.map((ele) => {
            return (
              <div key={`songQ_${ele.id}`}>
                <InGameQueueItem qItem={ele} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>No Songs in Queue!</div>;
  }
};
