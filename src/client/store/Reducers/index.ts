import { combineReducers } from "redux";
import { LoginReducer } from "./loginReducer/reducer";
import { ILoginState } from "./loginReducer/type";

export interface IRootState {
  loggedInStatus: ILoginState;
}

export const rootState = combineReducers({
  loggedInStatus: LoginReducer,
});
