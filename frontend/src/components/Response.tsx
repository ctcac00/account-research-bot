'use client';

import TextArea from '@leafygreen-ui/text-area';
import React from 'react';

const Response = () => {
  return (
    <div>
      <TextArea
        readOnly
        value=''
        label='Response'
        description='See your answer below'
      />
    </div>
  );
};

export default Response;
