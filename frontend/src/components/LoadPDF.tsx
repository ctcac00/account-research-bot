'use client';

import React from 'react';
import Label from './Label';
import SubmitButton from './SubmitButton';
import TextInput from '@leafygreen-ui/text-input';
import { Body, Subtitle } from '@leafygreen-ui/typography';

const LoadPDF = ({ account }: { account: string }) => {
  return (
    <div>
      <div className='my-2'>
        {account && (
          <div>
            <Subtitle>
              Adding a new PDF on the <b>{account}</b> account
            </Subtitle>
          </div>
        )}
        {!account && (
          <TextInput
            label='Account'
            description='Create a new account'
            placeholder='Account name'
          />
        )}
      </div>
      <div>
        <Label label={'Load PDF'} description={'Load a PDF file'} />
        <div>
          <form>
            <input type='file' id='myFile' name='filename' />
            <div className='mt-4'>
              <Body>Or use a URL to load the PDF file</Body>
            </div>
            <div className='mt-4'>
              <TextInput
                label='PDF URL'
                description='Use a URL to load a PDF'
                placeholder='https://example.com/file.pdf'
              />
            </div>
            <div className='mt-4'>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoadPDF;
