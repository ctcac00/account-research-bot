'use client';

import React from 'react';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';

const AskButton = () => {
  return (
    <div>
      <Button
        variant='primary'
        rightGlyph={<Icon glyph='QuestionMarkWithCircle' />}
      >
        Ask a question
      </Button>
    </div>
  );
};

export default AskButton;
