'use client';

import React from 'react';
import Label from './Label';
import SubmitButton from './SubmitButton';
import TextInput from '@leafygreen-ui/text-input';

const LoadPDF = () => {
  return (
    <div>
      <Label
        label={'Load PDF'}
        description={'Load a PDF for an existing or new account'}
      />
      <div>
        <form>
          <input type='file' id='myFile' name='filename' />
          <div className='mt-2'>
            <TextInput
              label='PDF URL'
              description='Use a URL to load a PDF'
              placeholder='https://example.com/file.pdf'
            />
          </div>
          <div className='mt-2'>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoadPDF;
