import { combineReducers, Dispatch, Reducer } from "redux";

// Import your state types and reducers here.

//good resources
//https://medium.com/@resir014/a-type-safe-approach-to-redux-stores-in-typescript-6474e012b81e
//https://blog.usejournal.com/writing-better-reducers-with-react-and-typescript-3-4-30697b926ada
/*

import reducerPlaceHolderType from './reducerPlaceHolder1/type'
import reducerPlaceHolderReducer from './reducerPlaceHolder1/reducer'

*/

// The top-level state object
// export interface ApplicationState {
//   reducer1Type: reducerPlaceHolder1
// }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApplicationState {}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>(
  {}
);

// export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>(
// {
//ONCE WE MAKE A REDUCERS UNCOMMENT THIS
// }
// );
