'use client';

import React, { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const PickAccounts = ({
  account,
  setAccount,
}: {
  account: string;
  setAccount: Dispatch<SetStateAction<string>>;
}) => {
  const queryClient = useQueryClient();
  const handleChange = (value: string | null) => {
    setAccount(value as string);

    queryClient.invalidateQueries({ queryKey: ['files'] });
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['accounts'],
    queryFn: () =>
      axios.get(`http://127.0.0.1:8000/accounts`).then((res) => res.data),
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

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
