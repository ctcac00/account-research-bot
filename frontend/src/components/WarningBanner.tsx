'use client';

import React from 'react';
import Banner from '@leafygreen-ui/banner';

const WarningBanner = () => {
  return (
    <div>
      <Banner variant='warning'>
        Only use <b>PUBLIC</b> data on this application.
      </Banner>
    </div>
  );
};

export default WarningBanner;
