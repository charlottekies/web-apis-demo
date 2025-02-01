import { findAllAuthors, FindAllAuthorsProps } from "../database/authorDatabase"
import { getBookById } from "./bookService";

export const getAllAuthors = async (props: FindAllAuthorsProps) => {
    const authors = await findAllAuthors(props)

    const authorsWithBooks = await Promise.all(
        authors.map(async (author) => {
          const books = await Promise.all(
                author.book_author.map(async (bookAuthor) => {
                  const book = await getBookById({bookId: bookAuthor.book_id});
                  return {
                    book_id: book?.book_id,
                    title: book?.title,
                  };
                })
              )
           
          return {
            author_id: author.author_id,
            author_name: author.author_name,
            books: books,
          };
        })
      );

    return {authors: authorsWithBooks};
}

