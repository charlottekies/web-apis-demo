'use client';

import BookCard from "@/components/bookCard";
import { useEffect, useState } from "react";
import { Book } from "../types/book";

const RestBooks = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/REST/getBooksWithImageAndAuthors");
        // optionally handle different HTTP response codes here
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="lg:px-4 px-[10%]">
      <div className="lg:flex lg:flex-row lg:w-full lg:flex-wrap gap-10">
        {data.map((book: Book, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <button
          onClick={() => console.log('clicked')}
          disabled={false}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => console.log("clicked")}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RestBooks;