'use client';

import React, { Dispatch, SetStateAction } from 'react';
import Label from './Label';
import TextInput from '@leafygreen-ui/text-input';
import { Body, Error, Subtitle } from '@leafygreen-ui/typography';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { PageLoader } from '@leafygreen-ui/loading-indicator';

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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

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
        `${process.env.NEXT_PUBLIC_API_URL}/upload-pdf?account=${data.accountToUse}`,
        formData
      );
    },
    onSuccess: () => {
      setLoading(false);
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
      setError('Error uploading PDF. Please try again.');
      setLoading(false);
    },
  });

  const loadPDF = useMutation({
    mutationFn: (data) => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/load-pdf?account=${data.accountToUse}&url=${data.pdfUrl}`
      );
    },
    onSuccess: () => {
      setLoading(false);
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
      setError('Error loading PDF. Please try again.');
      setLoading(false);
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

    setLoading(true);
    setError(undefined);
  };

  return (
    <div>
      {error && <Error>{error}</Error>}
      {loading && (
        <PageLoader description='Processing PDF. This might take a few minutes.' />
      )}
      {!loading && (
        <form>
          <div className='my-2'>
            {account && (
              <>
                <div>
                  <Subtitle>Add a new PDF on the {account} account</Subtitle>
                </div>

                <div className='my-2'>
                  <Body>Or add it to a a new account</Body>
                </div>
              </>
            )}

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
      )}
    </div>
  );
};

export default LoadPDF;
