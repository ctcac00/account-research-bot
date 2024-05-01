'use client';

import React from 'react';
import {
  SearchInput,
  SearchResult,
  SearchResultGroup,
} from '@leafygreen-ui/search-input';
import Label from './Label';

const SearchAccount = () => {
  return (
    <div>
      <Label label={'Account'} description={'Search for an account'} />
      <SearchInput id='search' aria-label='Search account'>
        <SearchResult
          onClick={() => {
            console.log('SB: Click Apple');
          }}
          description='This is a description'
        >
          Apple
        </SearchResult>
        <SearchResult>Banana</SearchResult>
        <SearchResult as='a' href='#' description='This is a link'>
          Carrot
        </SearchResult>
        <SearchResult description='This is a very very long description. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.'>
          Dragonfruit
        </SearchResult>
        <SearchResultGroup label='Peppers'>
          <SearchResult description='A moderately hot chili pepper used to flavor dishes'>
            Cayenne
          </SearchResult>
          <SearchResult>Ghost pepper</SearchResult>
          <SearchResult>Habanero</SearchResult>
          <SearchResult>Jalapeño</SearchResult>
          <SearchResult>Red pepper</SearchResult>
          <SearchResult>Scotch bonnet</SearchResult>
        </SearchResultGroup>
      </SearchInput>
    </div>
  );
};

export default SearchAccount;
