'use client';

import React, { Dispatch, SetStateAction } from 'react';

import LoadPDF from './LoadPDF';
import FileList from './FileList';
import PickAccounts from './PickAccounts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Modal from '@leafygreen-ui/modal';
import Button from '@leafygreen-ui/button';

const queryClient = new QueryClient();

const SideBar = ({
  account,
  setAccount,
}: {
  account: string;
  setAccount: Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div>
          <PickAccounts account={account} setAccount={setAccount} />
        </div>
        <div className='mt-8'>
          <FileList account={account} />
        </div>
        <div className='mt-8'>
          <Button onClick={() => setOpen(true)}>Add new PDF</Button>
        </div>
        <div>
          <Modal open={open} setOpen={setOpen}>
            <LoadPDF account={account} setOpen={setOpen} />
          </Modal>
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default SideBar;
