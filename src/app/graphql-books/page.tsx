'use client';
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from '@/components/bookCard';
import { Book } from '../types/book';

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
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50; // Number of items per page

  // Calculate skip value
  const skip = (currentPage - 1) * pageSize;

  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: { 
      includeAuthor: true, // Whether to include authors
      skip, 
      take: pageSize 
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle pagination controls
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
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GraphQLBooks;
