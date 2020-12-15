import { ISearchActions, CURRENT_SEARCH, ISearchState } from "./types";

const intialState: ISearchState = {
  tracks: {
    href: "",
    items: [],
    limit: 0,
    next: "",
    offset: 0,
    previous: "",
    total: 0,
  },
};

export const searchReducer = (
  state = intialState,
  action: ISearchActions
): ISearchState => {
  switch (action.type) {
    case CURRENT_SEARCH:
      return { ...action.payload };
    default:
      return state;
  }
};
