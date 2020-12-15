import {
  ISongQueueActions,
  ADD_SONG,
  REMOVE_SONG,
  ISongQueueState,
} from "./type";

const initalState: Array<ISongQueueState> = [];

export function SongReducer(
  state = initalState,
  action: ISongQueueActions
): Array<ISongQueueState> {
  switch (action.type) {
    case ADD_SONG:
      state.push(action.payload);
      return [...state];
    case REMOVE_SONG:
      state = state.filter((ele) => ele.id !== action.payload.id);
      return [...state];
    default:
      return state;
  }
}
