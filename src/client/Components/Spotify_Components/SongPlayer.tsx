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
        />
      </div>
    );
  } else {
    return <div>Connecting to Spotify Web Player!</div>;
  }
};
