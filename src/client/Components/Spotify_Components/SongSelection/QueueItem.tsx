import React from "react";
import { useDispatch } from "react-redux";
import { ISongQueueState } from "../../../store/Reducers/songQueueReducer/type";
import { removeSongFromQueue } from "../../../store/Reducers/songQueueReducer/asyncActions";

interface IqueueItemProps {
  qItem: ISongQueueState;
}

export const QueueItem: React.FC<IqueueItemProps> = ({
  qItem,
}): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <>
      <img src={qItem.img} />
      Name: {qItem.name} <br />
      BPM: {qItem.BPM} <br />
      <button onClick={() => dispatch(removeSongFromQueue(qItem))}>
        Remove Song
      </button>
    </>
  );
};
