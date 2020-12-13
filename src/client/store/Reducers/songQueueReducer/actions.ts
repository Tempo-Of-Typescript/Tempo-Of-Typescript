import { ISongQueueActions, ADD_SONG, ISongQueueState } from "./type";

export const _addSongToQueue = (
  songToAdd: ISongQueueState
): ISongQueueActions => ({
  type: ADD_SONG,
  payload: songToAdd,
});
