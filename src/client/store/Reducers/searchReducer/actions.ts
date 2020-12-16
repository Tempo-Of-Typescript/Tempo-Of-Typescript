import { ISearchActions, CURRENT_SEARCH, ISearchState } from "./types";

export const _setSearchData = (searchData: ISearchState): ISearchActions => {
  return {
    type: CURRENT_SEARCH,
    payload: searchData,
  };
};
