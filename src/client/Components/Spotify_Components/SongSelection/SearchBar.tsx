import React, { useState } from "react";
import axios from "axios";

export const SearchBar: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //dispatch searchTerm
    console.log(searchTerm);
    e.preventDefault();
  };

  //take this out
  const tryToDoAxiosCall = async () => {
    const doTheThing = await axios.get("api/spotify/search/");
    console.log("we did the thing!");
  };

  console.log("search term is", searchTerm);
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} />
      </form>

      <button onClick={() => tryToDoAxiosCall()}>tryMe!</button>
    </div>
  );
};
