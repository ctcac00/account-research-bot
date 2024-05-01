import React from 'react';
import SearchAccount from './SearchAccount';
import LoadPDF from './LoadPDF';
import CreateAccount from './CreateAccount';

const SideBar = () => {
  return (
    <div>
      <div>
        <SearchAccount />
      </div>
      <div className='mt-8'>
        <CreateAccount />
      </div>
      <div className='mt-8'>
        <LoadPDF />
      </div>
    </div>
  );
};

export default SideBar;
