import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import Sidebar from './Sidebar';
import './BtnSideBar.css'

function BtnSideBar() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleComponent = () => {
    setIsVisible((prev) => !prev);
  };

  return (
        <MediaQuery maxWidth={1225}>
      <div>
      
      <button onClick={toggleComponent} className='btn-sidebar-menu'>
        {isVisible ? 'Hide' : 'Show'}
      </button>

     
      {isVisible && (
       <Sidebar/>
      )}

    </div>
    </MediaQuery>
  );
}

export default BtnSideBar;
