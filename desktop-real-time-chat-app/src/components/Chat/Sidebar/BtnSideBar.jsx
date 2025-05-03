import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import Sidebar from './Sidebar';

function BtnSideBar() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleComponent = () => {
    setIsVisible((prev) => !prev);
  };

  return (
        <MediaQuery maxWidth={1225}>
      <div>
      
      <button onClick={toggleComponent} className='btn-sidebar'>
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
