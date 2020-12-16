export const ADD_SONG = "ADD_SONG";
export const REMOVE_SONG = "REMOVE_SONG";

export interface ISongQueueActions {
  type: string;
  payload: ISongQueueState;
}

export interface ISongQueueState {
  name: string;
  img: string;
  playbackURI: string;
  timeInMS: number;
  BPM: number;
  id: string;
}
