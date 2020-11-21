import { combineReducers, Dispatch, Reducer } from "redux";

// Import your state types and reducers here.
//https://medium.com/@resir014/a-type-safe-approach-to-redux-stores-in-typescript-6474e012b81e use this for flow approach

/*

import reducerPlaceHolderType from './reducerPlaceHolder1/type'
import reducerPlaceHolderReducer from './reducerPlaceHolder1/reducer'

*/

// The top-level state object
// export interface ApplicationState {
//   reducer1Type: reducerPlaceHolder1
// }

export interface ApplicationState {
  thisShouldBeReducerType: "seeAboveExample";
}

/*
    export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
        reducer : reducerPlaceHolderReducer
    });
*/

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>(
  {}
);
