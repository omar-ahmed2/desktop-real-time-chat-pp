import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Update the state with the current input value
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='inputWithButton'>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="   Search..."
        style={{color:'black'}}
      />
      <button type="submit">🔍</button>
    </form>
  );
};

export default SearchBar;
