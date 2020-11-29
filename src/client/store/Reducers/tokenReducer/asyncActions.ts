import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { _getTokens } from "./actions";
import { IRootState } from "../index";
import axios from "axios";

export const getSessionsTokens = (): ThunkAction<
  Promise<void>,
  IRootState,
  null,
  Action
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    //do something with databases here
    const data = await axios.post("/api/auth/sessionProvider/pageLoad/");
    console.log("data from axios call");
    console.log(data);
    //dispatch(_getTokens(['something']))
  };
};
