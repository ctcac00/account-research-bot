'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const NoSSR = dynamic(() => import('@leafygreen-ui/banner'), { ssr: false });

const WarningBanner = () => {
  return (
    <div>
      <NoSSR variant='warning'>
        Only use <b>PUBLIC</b> data on this application.
      </NoSSR>
    </div>
  );
};

export default WarningBanner;
