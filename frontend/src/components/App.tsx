'use client';

import React from 'react';
import SideBar from './SideBar';
import Chat from './Chat';

const App = () => {
  const [account, setAccount] = React.useState('');

  return (
    <>
      <div className='mr-10'>
        <SideBar account={account} setAccount={setAccount} />
      </div>
      <Chat account={account} />
    </>
  );
};

export default App;
