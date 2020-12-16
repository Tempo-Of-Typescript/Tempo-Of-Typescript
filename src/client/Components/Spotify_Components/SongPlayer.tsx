import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { tokenForSpotifyPlayer } from "../../utils";

export const SongPlayer: React.FC = (): JSX.Element => {
  const [authToken, setAuthToken] = useState("");

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
          uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
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
