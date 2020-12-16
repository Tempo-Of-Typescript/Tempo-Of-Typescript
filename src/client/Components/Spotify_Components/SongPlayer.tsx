import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";
import { IRootState } from "../../store/Reducers";
import { tokenForSpotifyPlayer } from "../../utils";

interface ISongPlayer {
  isPlaying: boolean;
}

export const SongPlayer: React.FC<ISongPlayer> = ({
  isPlaying,
}): JSX.Element => {
  const [authToken, setAuthToken] = useState("");

  const { songQueue } = useSelector((state: IRootState) => state);

  const uriList: Array<string> = [];

  songQueue.forEach((ele) => {
    uriList.push(ele.playbackURI);
  });

  useEffect(() => {
    tokenForSpotifyPlayer().then((value) => {
      setAuthToken(value);
    });
  }, []);

  if (authToken.length > 0) {
    return (
      <div>
        <SpotifyPlayer
          token={authToken}
          uris={uriList}
          play={isPlaying}
          autoPlay={false}
          styles={{
            activeColor: "#000000",
            bgColor: "#000000",
            color: "#000000",
            loaderColor: "#000000",
            sliderColor: "#000000",
            trackArtistColor: "#000000",
            trackNameColor: "#000000",
          }}
        />
      </div>
    );
  } else {
    return <div>Connecting to Spotify Web Player!</div>;
  }
};
