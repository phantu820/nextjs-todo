'use client';

import React from 'react';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '@/redux/features/api/apiSlice';

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApiProvider api={apiSlice}>{children}</ApiProvider>;
};

export default StateProvider;
