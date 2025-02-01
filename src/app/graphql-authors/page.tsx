'use client';
// Home.tsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import AuthorTable from '@/components/AuthorTable';

const GET_AUTHORS = gql`
  query GetAuthors($includeBooks: Boolean!) {
    authors(includeBooks: $includeBooks) {
      author_id
      author_name
      books @include(if: $includeBooks) {
        book_id
        title
      }
    }
  }
`;
const GraphQLAuthors = () => {
  const { data, loading, error } = useQuery(GET_AUTHORS, {
    variables: { includeBooks: true }, // Pass the value for includeBooks
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return AuthorTable(data)
};

export default GraphQLAuthors
