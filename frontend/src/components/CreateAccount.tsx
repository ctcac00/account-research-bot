'use client';

import React from 'react';
import SubmitButton from './SubmitButton';
import TextInput from '@leafygreen-ui/text-input';

const CreateAccount = () => {
  return (
    <div>
      <form>
        <TextInput
          label='Account'
          description='Create a new account'
          placeholder='Account name'
        />
        <div className='mt-2'>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
