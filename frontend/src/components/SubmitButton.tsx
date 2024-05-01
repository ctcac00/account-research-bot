'use client';

import React from 'react';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';

const SubmitButton = () => {
  return (
    <div>
      <Button variant='primary' rightGlyph={<Icon glyph='Write' />}>
        Submit
      </Button>
    </div>
  );
};

export default SubmitButton;
