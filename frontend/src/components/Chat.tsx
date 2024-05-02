'use client';

import React from 'react';
import TextArea from '@leafygreen-ui/text-area';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { useMutation, QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const queryClient = new QueryClient();

const Chat = ({ account }: { account: string }) => {
  const [query, setQuery] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [enabled, setEnabled] = React.useState(false);

  const askBot = useMutation(
    {
      mutationFn: (query) => {
        return axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/ask-bot?query=${query}&account=${account}`
        );
      },
      onSuccess: (data) => {
        setResponse(data.data.result);
      },
    },
    queryClient
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askBot.mutate(query);
    setResponse('Fetching response...');
    setEnabled(false);
  };

  return (
    <div className='flex-grow max-w-screen-lg'>
      <div>
        <TextArea
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setEnabled(true);
          }}
          label='Query'
          description='Ask your question here'
        />
      </div>
      <div className='mt-2'>
        <Button
          disabled={!enabled}
          onClick={handleSubmit}
          variant='primary'
          rightGlyph={<Icon glyph='QuestionMarkWithCircle' />}
        >
          Ask a question
        </Button>
      </div>
      <div className='mt-2'>
        <TextArea
          readOnly
          value={response}
          label='Response'
          description='See your answer below'
          rows={response.length / 50}
        />
      </div>
    </div>
  );
};

export default Chat;
