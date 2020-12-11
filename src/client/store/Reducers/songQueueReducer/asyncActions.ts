import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { _addSongToQueue } from "./actions";
import { IRootState } from "../index";
import axios from "axios";

export const getLoginStatus = (): ThunkAction<
  Promise<void>,
  IRootState,
  null,
  Action
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    //make axios call to get song info

    //fake data for now so we can test feature for game

    // const fakeDispatch = [
    //     {timeInMS:120000,BPM: 85},
    //     {timeInMS:180000,BPM: 125},
    //     {timeInMS:150000,BPM: 70},
    //     {timeInMS:90000,BPM: 155},
    // ]

    const fakeDispatch = {
      timeInMS: 120000,
      BPM: 85,
    };

    dispatch(_addSongToQueue(fakeDispatch));
  };
};
