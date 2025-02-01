import BookCard from "./bookCard"

const Carousel = ({ books }: { books: any[] }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default Carousel;