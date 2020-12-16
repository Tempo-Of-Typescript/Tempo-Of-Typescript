import axios from "axios";

export const tokenForSpotifyPlayer = async (): Promise<string> => {
  const { data } = await axios.get("/auth/spotifyRoutes/userToken");
  return data;
};
