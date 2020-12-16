import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState as AppState } from "../../../../store/Reducers";
import { QueueItem } from "./QueueItem";

export const QueueViz = (): JSX.Element => {
  const { songQueue } = useSelector((state: AppState) => state);

  if (songQueue.length > 0) {
    return (
      <div className="song-queue">
        {songQueue.map((ele) => {
          return (
            <div key={`songQ_${ele.id}`}>
              <QueueItem qItem={ele} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>No Songs in Queue!</div>;
  }
};
