import publicProcedure from '../../../../trpc/procedures/public';
import { router } from '../../../../trpc/trpc';
import { getAllBooks } from '../service/bookService';

export const bookRouter = router({
  getAllBooksWithAuthorAndCover: publicProcedure
    .query(async () => {
      return await getAllBooks({ includeAuthor: true, includeImage: true });
    }),
  getAllBooks: publicProcedure
    .query(async () => {
      return await getAllBooks({})
    })
});

