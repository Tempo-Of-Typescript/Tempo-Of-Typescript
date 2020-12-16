import React from "react";
import { SearchBar } from "./SelectorComponents/SearchBar";
import { DisplaySongs } from "./SelectorComponents/DisplaySongs";
import { QueueViz } from "./SelectorComponents/QueueViz";

export const SongSelection: React.FC = (): JSX.Element => {
  return (
    <div className="song-selection">
      <h1>Search for songs and add them to your queue:</h1>
      <SearchBar />
      <DisplaySongs />
      <QueueViz />
    </div>
  );
};
