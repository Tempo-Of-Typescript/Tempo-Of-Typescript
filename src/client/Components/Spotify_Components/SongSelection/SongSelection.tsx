import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { useSelector } from "react-redux";
import { IRootState as AppState } from "../../../store/Reducers";

export const SongSelection = (): JSX.Element => {
  const { loggedInStatus } = useSelector((state: AppState) => state);

  /*
        Search bar
        results
        queue (with go button)

    */

  return (
    <div>
      <SearchBar />
    </div>
  );
};
