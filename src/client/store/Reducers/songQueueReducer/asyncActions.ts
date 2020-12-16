import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { _addSongToQueue, _removeSongFromQueue } from "./actions";
import { IRootState } from "../index";
import { IindividualSongProps } from "../searchReducer/types";
import { ISongQueueState } from "./type";
import axios from "axios";

export const addSongToQueue = (
  song: IindividualSongProps
): ThunkAction<Promise<void>, IRootState, null, Action> => {
  return async (dispatch: Dispatch): Promise<void> => {
    console.log(song);

    const { data } = await axios.get(
      `api/spotify/search/getAudioFeature/${song.id}`
    );

    const songObjForDispatch = {
      name: song.name,
      img: song.album.images[1].url,
      playbackURI: song.uri,
      timeInMS: song.duration_ms,
      BPM: data.BPM,
      id: song.id,
    };

    dispatch(_addSongToQueue(songObjForDispatch));
  };
};

export const removeSongFromQueue = (
  songToRemove: ISongQueueState
): ThunkAction<void, IRootState, null, Action> => {
  return (dispatch: Dispatch): void => {
    dispatch(_removeSongFromQueue(songToRemove));
  };
};
