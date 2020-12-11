import { ISongQueueActions, ADD_SONG, ISongQueueState } from "./type";

const initalState: Array<ISongQueueState> = [
  { timeInMS: 120000, BPM: 85 },
  { timeInMS: 180000, BPM: 125 },
  { timeInMS: 150000, BPM: 70 },
  { timeInMS: 90000, BPM: 155 },
];

export function SongReducer(
  state = initalState,
  action: ISongQueueActions
): Array<ISongQueueState> {
  switch (action.type) {
    case ADD_SONG:
      //state.push(action.payload)
      //will eventuall add song here
      //returning state for testing purposes
      return state;
    default:
      return state;
  }
}
