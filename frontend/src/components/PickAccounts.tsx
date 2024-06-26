'use client';

import React, { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import { useQuery } from '@tanstack/react-query';

const PickAccounts = ({
  account,
  setAccount,
}: {
  account: string;
  setAccount: Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = (value: string | null) => {
    setAccount(value as string);
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['accounts'],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/accounts`)
        .then((res) => res.data),
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <Combobox
        multiselect={false}
        label='Account'
        description='Select an existing account'
        placeholder='Select account'
        onChange={handleChange}
        value={account}
        onClear={() => console.log('clear')}
      >
        {data?.map((account: any) => (
          <ComboboxOption key={account} value={account} />
        ))}
      </Combobox>
    </div>
  );
};

export default PickAccounts;
