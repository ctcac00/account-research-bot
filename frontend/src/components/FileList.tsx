'use client';

import React from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Label from './Label';

const FileList = ({ account }: { account: string }) => {
  const queryClient = useQueryClient();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['files'],
    queryFn: () =>
      axios
        .get(`http://127.0.0.1:8000/files?account=${account}`)
        .then((res) => res.data),
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

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
