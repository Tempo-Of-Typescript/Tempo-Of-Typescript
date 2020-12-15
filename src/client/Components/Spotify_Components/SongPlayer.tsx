import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export const SongPlayer = (): JSX.Element => {
  return (
    <div>
      <SpotifyPlayer
        token="x"
        uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
        autoPlay={false}
      />
    </div>
  );
};
