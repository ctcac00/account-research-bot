'use client';

import React from 'react';
import TextArea from '@leafygreen-ui/text-area';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import axios from 'axios';

const queryClient = new QueryClient();

const Chat = () => {
  const [query, setQuery] = React.useState('');
  const [response, setResponse] = React.useState('');

  console.log(query);

  const askBot = useMutation(
    {
      mutationFn: (query) => {
        console.log('query', query);

        return axios.get(`http://localhost:8000/ask-bot?query=${query}`);
      },
      onSuccess: (data) => {
        console.log('success', data);
        setResponse(data.data.result);
      },
    },
    queryClient
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('submitting');

    askBot.mutate(query);
  };

  return (
    <div className='flex-grow max-w-screen-lg'>
      <div>
        <TextArea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label='Query'
          description='Ask your question here'
        />
      </div>
      <div className='mt-2'>
        <Button
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
