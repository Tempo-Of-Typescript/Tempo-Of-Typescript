import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchSpotify } from "../../../../store/Reducers/searchReducer/asyncActions";

export const SearchBar: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(searchSpotify(searchTerm));
    e.preventDefault();
  };

  return (
    <div className="song-search">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="nes-input is-success"
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </form>
    </div>
  );
};
