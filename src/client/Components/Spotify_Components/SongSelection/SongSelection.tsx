import React from "react";
import { SearchBar } from "./SelectorComponents/SearchBar";
import { DisplaySongs } from "./SelectorComponents/DisplaySongs";
import { QueueViz } from "./SelectorComponents/QueueViz";
import { ButtonToGame } from "./SelectorComponents/ButtonToGame";

export const SongSelection: React.FC = (): JSX.Element => {
  return (
    <div>
      <SearchBar />
      <DisplaySongs />
      <QueueViz />
      <ButtonToGame />
    </div>
  );
};
