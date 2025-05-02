import React, { useState } from 'react';
import searchclasses from './searchbar.module.css';

const ChatSearchInput = ({ searchTerm, setSearchTerm }) => {
  
  return (


      <div className={searchclasses.InputSearchContainer}>
        <input placeholder="Search name ..." className={searchclasses.inputSearchuser} type="text"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)} />
         
      </div>
      
  );


};


export default ChatSearchInput;

