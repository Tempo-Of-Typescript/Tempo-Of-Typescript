import React, { useState } from "react";

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

  console.log("search term is", searchTerm);
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} />
      </form>
    </div>
  );
};
