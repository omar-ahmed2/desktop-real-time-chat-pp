import React from 'react';
import './navfilter.css';

const NavFilter = ({ active, onSelect }) => {
  const filters = ['All', 'Unread', 'Favorites', 'Groups'];

  return (
    <nav className='navfiltercontainer'>
      {filters.map((item) => (
        <button
          key={item}
          className='navfilterBtn'
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};

export default NavFilter;
