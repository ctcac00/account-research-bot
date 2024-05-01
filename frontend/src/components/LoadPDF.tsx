'use client';

import React, { Dispatch, SetStateAction } from 'react';
import Label from './Label';
import TextInput from '@leafygreen-ui/text-input';
import { Body, Subtitle } from '@leafygreen-ui/typography';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';

const LoadPDF = ({
  account,
  setOpen,
}: {
  account: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pdf, setPdf] = React.useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = React.useState<string | undefined>(undefined);
  const [newAccount, setNewAccount] = React.useState<string | undefined>(
    undefined
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdf(e.target.files[0]);
    }
  };

  const uploadPDF = useMutation({
    mutationFn: (data) => {
      const formData = new FormData();
      formData.append('file', data.pdf);

      return axios.post(
        `http://localhost:8000/upload-pdf?account=${data.accountToUse}`,
        formData
      );
    },
  });

  const loadPDF = useMutation({
    mutationFn: (data) => {
      return axios.get(
        `http://localhost:8000/load-pdf?account=${data.accountToUse}&url=${data.pdfUrl}`
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let accountToUse = account;
    if (newAccount) {
      accountToUse = newAccount;
    }

    if (pdfUrl) {
      loadPDF.mutate({ accountToUse, pdfUrl });
    } else if (pdf) {
      uploadPDF.mutate({ accountToUse, pdf });
    }

    setOpen(false);
  };

  return (
    <div>
      <form>
        <div className='my-2'>
          {account && (
            <div>
              <Subtitle>Add a new PDF on the {account} account</Subtitle>
            </div>
          )}
          <div className='my-2'>
            <Body>Or add it to a a new account</Body>
          </div>

          <TextInput
            label='Account'
            optional
            description='Create a new account'
            placeholder='Account name'
            value={newAccount}
            onChange={(e) => setNewAccount(e.target.value)}
          />
        </div>
        <div className='mt-6'>
          <Label label={'Load PDF'} description={'Load a PDF file'} />
          <div>
            <input
              type='file'
              id='myFile'
              name='filename'
              onChange={handleFileChange}
            />
            <div className='my-2'>
              <Body>Or use a URL to load the PDF file</Body>
            </div>
            <div>
              <TextInput
                label='PDF URL'
                description='Use a URL to load a PDF'
                placeholder='https://example.com/file.pdf'
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
              />
            </div>
            <div className='mt-4'>
              <Button
                onClick={handleSubmit}
                variant='primary'
                rightGlyph={<Icon glyph='Write' />}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoadPDF;
