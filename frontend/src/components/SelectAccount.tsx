'use client';

import React from 'react';
import { Select, Option } from '@leafygreen-ui/select';

const SelectAccount = () => {
  return (
    <div className=''>
      <Select
        label='Account'
        description='Select an existing account'
        placeholder='Placeholder'
        name='account'
        defaultValue='cat'
        dropdownWidthBasis='option'
      >
        <Option value='dog' description='Bark'>
          Dog
        </Option>
        <Option value='cat'>Cat</Option>
        <Option value='hamster'>Hamster</Option>
        <Option value='parrot'>Parrot</Option>
      </Select>
    </div>
  );
};

export default SelectAccount;
