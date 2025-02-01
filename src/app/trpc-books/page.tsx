'use client';
import React, { useState } from 'react';
import BookCard from '@/components/bookCard';
import { trpc } from '../../../utils/trpc';
import { Button } from '@mui/material';


const TRPCBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  // const skip = (currentPage - 1) * pageSize;

  const { data, isLoading, error } = trpc.getAllBooksWithAuthorAndCover.useQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // TODO: Implement infinite query pagination 
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  return (

    <div className="lg:px-4 px-[10%]">
      <div className="lg:flex lg:flex-row lg:w-full lg:flex-wrap gap-10">
        {data.map((book) => (
          <BookCard key={book.book_id} book={book} />
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={goToNextPage}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default TRPCBooks;
