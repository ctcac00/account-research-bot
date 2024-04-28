'use client';

import React from 'react';
import { Label } from '@leafygreen-ui/typography';

const LoadPDF = () => {
  return (
    <div>
      <Label htmlFor='search'>Load PDF</Label>
      <p
        style={{
          fontFamily:
            "'Euclid Circular A', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: '#5C6C75',
          fontSize: '13px',
        }}
      >
        Load a PDF for an existing or new account
      </p>
      <div>
        <form>
          <input type='file' id='myFile' name='filename' />
          <input type='submit' />
        </form>
      </div>
    </div>
  );
};

export default LoadPDF;
