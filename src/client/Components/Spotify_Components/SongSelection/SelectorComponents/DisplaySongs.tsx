import React from "react";
import { useSelector } from "react-redux";
import { IRootState as AppState } from "../../../../store/Reducers";
import { IndividualSong } from "./IndividualSong";

export const DisplaySongs = (): JSX.Element => {
  const { spotifySearch } = useSelector((state: AppState) => state);

  const trackArr = spotifySearch.tracks.items;

  if (trackArr.length > 0) {
    return (
      <div className="song-list">
        {trackArr.map((ele) => {
          return (
            <div key={`individualsong_${ele.id}`}>
              <IndividualSong song={ele} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Search for a song above!</div>;
  }
};
