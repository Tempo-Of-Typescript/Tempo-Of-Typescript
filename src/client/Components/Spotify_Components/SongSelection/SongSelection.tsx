import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { useSelector } from "react-redux";
import { DisplaySongs } from "./DisplaySongs";
import { IRootState as AppState } from "../../../store/Reducers";
import { QueueViz } from "./QueueViz";

export const SongSelection = (): JSX.Element => {
  //dont need?
  const { loggedInStatus } = useSelector((state: AppState) => state);

  /*
        Search bar
        results
        queue (with go button)

    */

  return (
    <div>
      <SearchBar />
      <DisplaySongs />
      <QueueViz />
    </div>
  );
};
