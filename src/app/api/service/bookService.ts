import { FindAllBooksProps, PrismaBooks, findAllBooks, findBookById } from "../database/booksDatabase";
import { mapPrismaBooksToBooksDTO, mapPrismaBooksToBooksWithImagesAndAuthorsDTO } from "../mappers/booksMappers";


export type FetchCoverImageUrlType = Awaited<ReturnType<typeof fetchCoverImageUrl>>

export const getAllBooks = async (props: FindAllBooksProps) => {
  const books = await findAllBooks(props);

  if (props.includeImage) {
    const booksWithCoverImage = await getCoverImages(books);
    return mapPrismaBooksToBooksWithImagesAndAuthorsDTO(booksWithCoverImage);
  }

  return mapPrismaBooksToBooksDTO(books);
};

export type PrismaBooksWithCoverImage = Awaited<ReturnType<typeof getCoverImages>>

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

interface GoogleBooksResponse {
  items?: {
    volumeInfo?: {
      imageLinks?: {
        thumbnail?: string;
      };
    };
  }[];
}

export const fetchCoverImageUrl = async (isbn: string | null): Promise<string | null> => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const data: GoogleBooksResponse = await response.json();
    
    return data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ?? null;
  } catch (error) {
    console.error("Error fetching cover image:", error);
    return null;
  }
};