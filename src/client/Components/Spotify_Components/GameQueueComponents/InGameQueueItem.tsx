import React from "react";
import { ISongQueueState } from "../../../store/Reducers/songQueueReducer/type";

interface IqueueItemProps {
  qItem: ISongQueueState;
}

export const InGameQueueItem: React.FC<IqueueItemProps> = ({
  qItem,
}): JSX.Element => {
  return (
    <div className="game-queue-song">
      <img src={qItem.img} />
      <div>
        BPM: {qItem.BPM} <br />
      </div>
    </div>
  );
};
