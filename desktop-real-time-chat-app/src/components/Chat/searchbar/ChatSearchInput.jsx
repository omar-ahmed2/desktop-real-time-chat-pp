import React from "react";
import searchclasses from "./Searchbar.module.css";

const ChatSearchInput = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={searchclasses.InputSearchContainer}>
      <input
        type="text"
        className={searchclasses.inputSearchuser}
        placeholder="Search name ..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default ChatSearchInput;
