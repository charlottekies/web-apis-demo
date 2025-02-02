import { Book } from "@/app/types/book";
import BookCoverPlaceholder from "../../public/icons/BookCoverPlaceholder";
import Image from "next/image";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="py-4 lg:my-0 my-4 xl:my-0 lg:w-[200px] lg:min-h-[400px] bg-white px-4 rounded-lg shadow-md border-solid border-2 border-gray-200 ">
      {!book.coverImageUrl && (
        <div className="lg:w-full lg:h-[255px] lg:bg-gray-200 rounded-lg flex items-center justify-center">
          <BookCoverPlaceholder />
          <span className="w-[90px] absolute h-[65px] text-ellipsis overflow-hidden line-clamp-4 text-white text-xs font-bold">{book.title}</span>
        </div>
      )}
      {book.coverImageUrl && (

        <div className="w-full h-[400px] xl:h-[255px] lg:h-[255px] lg:bg-gray-200 rounded-lg flex items-center justify-center">
          <Image width="255" height="405" className="h-[405px] lg:h-[255px] w-[255px] overflow-hidden" src={book.coverImageUrl} alt={"book cover"} />
        </div>

      )}
      <div className="min-h-[60px] flex flex-col justify-between mt-2">
        <h3 className="font-semibold lg:text-sm xl:text-sm md:text-sm text-md text-gray-800">{book.title}</h3>
        <p className="lg:text-xs xl:text-xs md:text-xs text-md text-gray-600">{book.book_author?.author_name}</p>
      </div>
    </div>

  );
};

export default BookCard;