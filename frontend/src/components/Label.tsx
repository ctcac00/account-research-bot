'use client';

import React from 'react';
import { Label } from '@leafygreen-ui/typography';

const MyLabel = ({
  label,
  description,
}: {
  label: string;
  description: string;
}) => {
  return (
    <>
      <Label htmlFor='search'>{label}</Label>
      <p
        style={{
          fontFamily:
            "'Euclid Circular A', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: '#5C6C75',
          fontSize: '13px',
        }}
      >
        {description}
      </p>
    </>
  );
};

export default MyLabel;
