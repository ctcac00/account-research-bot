'use client';

import React from 'react';
import Query from './Query';
import Button from './AskButton';
import Response from './Response';

const Chat = () => {
  return (
    <div className='flex-grow max-w-screen-lg'>
      <div>
        <Query />
      </div>
      <div className='mt-2'>
        <Button />
      </div>
      <div className='mt-2'>
        <Response />
      </div>
    </div>
  );
};

export default Chat;
