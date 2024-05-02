'use client';

import React from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Label from './Label';

const FileList = ({ account }: { account: string }) => {
  const { error, data, isFetching } = useQuery({
    queryKey: ['files', account],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/files?account=${account}`)
        .then((res) => res.data),
    enabled: !!account,
  });

  if (isFetching) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <Label
        label={'Files'}
        description={'List of PDF files for the account'}
      />
      <div className='mt-2'>
        <ul>
          {data?.map((file: any) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileList;
