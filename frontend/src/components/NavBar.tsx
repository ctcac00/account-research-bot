'use client';

import React from 'react';
import { MongoDBLogo } from '@leafygreen-ui/logo';
import { H2 } from '@leafygreen-ui/typography';

const NavBar = () => {
  return (
    <nav className='border-b-2 border-gray-200'>
      <div className='flex justify-between p-2'>
        <a href='https://mongodb.com/' className='w-1/3 flex justify-start'>
          <MongoDBLogo />
        </a>
        <a href='/' className='w-1/3 flex justify-center'>
          <H2>Account Research Bot</H2>
        </a>
        <div className='w-1/3 flex justify-center' />
      </div>
    </nav>
  );
};

export default NavBar;
