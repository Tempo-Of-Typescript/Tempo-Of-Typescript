import {
  ISongQueueActions,
  ADD_SONG,
  ISongQueueState,
  REMOVE_SONG,
} from "./type";

export const _addSongToQueue = (
  songToAdd: ISongQueueState
): ISongQueueActions => ({
  type: ADD_SONG,
  payload: songToAdd,
});

export const _removeSongFromQueue = (
  songToRemove: ISongQueueState
): ISongQueueActions => ({
  type: REMOVE_SONG,
  payload: songToRemove,
});
