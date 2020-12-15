import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { IRootState } from "../index";
import { _setSearchData } from "./actions";
import axios from "axios";

export const searchSpotify = (
  searchTerm: string
): ThunkAction<Promise<void>, IRootState, null, Action> => {
  return async (dispatch: Dispatch) => {
    const { data } = await axios.post("api/spotify/search/", {
      query: searchTerm,
      type: "track",
      market: "US",
      limit: 20,
      offset: 0,
    });
    dispatch(_setSearchData(data));
  };
};
