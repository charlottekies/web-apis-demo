import { FindAllBooksProps, PrismaBooks, findAllBooks, findBookById } from "../database/booksDatabase";
import { mapPrismaBooksToBooksDTO, mapPrismaBooksToBooksWithImagesAndAuthorsDTO } from "../mappers/booksMappers";



export const getAllBooks = async (props: FindAllBooksProps) => {
  const books = await findAllBooks(props);

  if (props.includeImage) {
    const booksWithCoverImage = await getCoverImages(books);
    return mapPrismaBooksToBooksWithImagesAndAuthorsDTO(booksWithCoverImage);
  } else {
    return mapPrismaBooksToBooksDTO(books);
  }
};


export const getBookById = async ({ bookId }: { bookId: number }) => {
  return await findBookById({ bookId: bookId })
}

const getCoverImages = async (books: PrismaBooks) => {
  return await Promise.all(
    books.map(async (book) => {
      const coverImageUrl = await fetchCoverImageUrl(book.isbn13);
      return {
        ...book,
        coverImageUrl,
      };
    })
  );
};

export type PrismaBooksWithCoverImage = Awaited<ReturnType<typeof getCoverImages>>

interface GoogleBooksResponse {
  items?: {
    volumeInfo?: {
      imageLinks?: {
        thumbnail?: string;
        extraLarge?: string;
      };
    };
  }[];
}

export const fetchCoverImageUrl = async (isbn: string | null) => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const data: GoogleBooksResponse = await response.json();

    return data.items?.[0]?.volumeInfo?.imageLinks?.extraLarge ?? data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
  } catch (error) {
    console.error("Error fetching cover image:", error);
    return null;
  }
};
export type FetchCoverImageUrlType = Awaited<ReturnType<typeof fetchCoverImageUrl>>
