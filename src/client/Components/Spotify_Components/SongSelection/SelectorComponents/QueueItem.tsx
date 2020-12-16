import React from "react";
import { useDispatch } from "react-redux";
import { ISongQueueState } from "../../../../store/Reducers/songQueueReducer/type";
import { removeSongFromQueue } from "../../../../store/Reducers/songQueueReducer/asyncActions";

interface IqueueItemProps {
  qItem: ISongQueueState;
}

export const QueueItem: React.FC<IqueueItemProps> = ({
  qItem,
}): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div className="individal-queue-song">
      <img src={qItem.img} />
      <div className="queue-song">
        Name: {qItem.name} <br />
        BPM: {qItem.BPM} <br />
        <div>
          <button
            className="nes-btn is-error"
            onClick={() => dispatch(removeSongFromQueue(qItem))}
          >
            Remove Song
          </button>
        </div>
      </div>
    </div>
  );
};
