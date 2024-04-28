import React from 'react';
import SearchAccount from './SearchAccount';
import LoadPDF from './LoadPDF';

const SideBar = () => {
  return (
    <div>
      <div>
        <LoadPDF />
      </div>
      <div className='mt-2'>
        <SearchAccount />
      </div>
    </div>
  );
};

export default SideBar;
