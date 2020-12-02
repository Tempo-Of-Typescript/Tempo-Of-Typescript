import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer/reducer";
import { ITokenState } from "./tokenReducer/type";

export interface IRootState {
  spotifyAuthTokens: ITokenState;
}

export const rootState = combineReducers({
  spotifyAuthTokens: tokenReducer,
});
