import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { _getLoginStatus } from "./actions";
import { IRootState } from "../index";
import axios from "axios";

export const getLoginStatus = (): ThunkAction<
  Promise<void>,
  IRootState,
  null,
  Action
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    const { data } = await axios.get("/auth/spotifyRoutes/loginStatus");
    console.log("data from axios call");
    console.log(data);
    dispatch(_getLoginStatus(data));
  };
};
