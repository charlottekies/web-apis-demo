import { PrismaBooks } from "../database/booksDatabase";
import { PrismaBooksWithCoverImage } from "../service/bookService";

export const mapPrismaBooksToBooksDTO = (books: PrismaBooks) => {
  return books.map((book) => ({
    book_id: book.book_id,
    title: book.title,
    book_author: book.book_author.map((ba) => ({
      author_id: ba.author?.author_id || null,
      author_name: ba.author?.author_name || null,
    }))[0] || null,
  }));
};
export type BooksDTO = Awaited<ReturnType<typeof mapPrismaBooksToBooksDTO>>

export const mapPrismaBooksToBooksWithImagesAndAuthorsDTO = (books: PrismaBooksWithCoverImage) => {
  return books.map((book) => ({
    book_id: book.book_id,
    title: book.title,
    book_author: book.book_author.map((ba) => ({
      author_id: ba.author?.author_id || null,
      author_name: ba.author?.author_name || null,
    }))[0] || null,
    coverImageUrl: book.coverImageUrl, 
  }));
};
export type BooksWithImagesAndAuthorsDTO = ReturnType<typeof mapPrismaBooksToBooksWithImagesAndAuthorsDTO>
