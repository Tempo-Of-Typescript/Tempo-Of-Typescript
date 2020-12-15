import { combineReducers } from "redux";
import { LoginReducer } from "./loginReducer/reducer";
import { ILoginState } from "./loginReducer/type";
import { ISongQueueState } from "./songQueueReducer/type";
import { SongReducer } from "./songQueueReducer/reducer";
import { ISearchState } from "./searchReducer/types";
import { searchReducer } from "./searchReducer/reducer";

export interface IRootState {
  loggedInStatus: ILoginState;
  songQueue: Array<ISongQueueState>;
  spotifySearch: ISearchState;
}

export const rootState = combineReducers({
  loggedInStatus: LoginReducer,
  songQueue: SongReducer,
  spotifySearch: searchReducer,
});
