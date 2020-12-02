import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/Reducers/index";

export const SpotifyLogin: React.FC = () => {
  const { spotifyAuthTokens } = useSelector((state: IRootState) => {
    return {
      spotifyAuthTokens: state.spotifyAuthTokens,
    };
  });

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => window.open(window.location.origin)}>
        Login To Spotify
      </button>
      Spotify Login ree
    </div>
  );
};
