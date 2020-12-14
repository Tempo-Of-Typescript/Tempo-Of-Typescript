import { combineReducers } from "redux";
import { LoginReducer } from "./loginReducer/reducer";
import { ILoginState } from "./loginReducer/type";
import { ISongQueueState } from "./songQueueReducer/type";
import { SongReducer } from "./songQueueReducer/reducer";

export interface IRootState {
  loggedInStatus: ILoginState;
  songQueue: Array<ISongQueueState>;
}

export const rootState = combineReducers({
  loggedInStatus: LoginReducer,
  songQueue: SongReducer,
});
