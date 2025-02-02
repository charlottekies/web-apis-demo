'use client';
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from '@/components/bookCard';
import { Book } from '../types/book';
import { Button } from '@mui/material';

const GET_BOOKS = gql`
  query GetBooks($includeAuthor: Boolean!, $skip: Int!, $take: Int!) {
    books(includeAuthor: $includeAuthor, skip: $skip, take: $take) {
      coverImageUrl
      title
      book_author @include(if: $includeAuthor) {  
          author_id
          author_name
      }
    }
  }
`;

const GraphQLBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50; 
  const skip = (currentPage - 1) * pageSize;

  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: { 
      includeAuthor: true, 
      skip, 
      take: pageSize 
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="lg:px-4 px-[10%]">
      <div className="lg:flex lg:flex-row lg:w-full lg:flex-wrap gap-10">
        {data.books.map((book: Book, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <Button
          variant="contained"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={goToNextPage}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default GraphQLBooks;
