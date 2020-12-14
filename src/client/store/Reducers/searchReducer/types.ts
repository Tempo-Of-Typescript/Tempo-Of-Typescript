const CURRENT_SEARCH = "CURRENT_SEARCH";

//Array<Record<string, unknown>>

//change these to search
export interface ISearchActions {
  type: string;
  payload: ISearchState;
}

export interface ISearchState {
  timeInMS: number;
  BPM: number;
}
