'use client';
import React from 'react';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

const LeafyGreenProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <LeafyGreenProvider darkMode={true}>{children}</LeafyGreenProvider>;
};

export default LeafyGreenProviderWrapper;
