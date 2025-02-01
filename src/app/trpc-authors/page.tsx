'use client';
import React from 'react';
import AuthorTable from '@/components/AuthorTable';
import { trpc } from '../../../utils/trpc';


const TRPCAuthors = () => {
  const { data, isLoading, error } = trpc.getAuthorsWithBooks.useQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
  return AuthorTable(data);
  }
};

export default TRPCAuthors;
