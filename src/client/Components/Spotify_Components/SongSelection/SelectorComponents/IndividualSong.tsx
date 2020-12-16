import React from "react";
import { useDispatch } from "react-redux";
import { IindividualSongProps } from "../../../../store/Reducers/searchReducer/types";
import { addSongToQueue } from "../../../../store/Reducers/songQueueReducer/asyncActions";

interface individualSongProps {
  song: IindividualSongProps;
}

export const IndividualSong: React.FC<individualSongProps> = ({
  song,
}): JSX.Element => {
  const { album, name } = song;
  //change this to 1 for slightly larger image (0=>largest, 2=>smallest)
  const imageURL = album.images[2].url;
  const dispatch = useDispatch();

  return (
    <div>
      <img src={imageURL}></img>
      {name}
      <button onClick={() => dispatch(addSongToQueue(song))}>
        Add To Queue
      </button>
    </div>
  );
};
