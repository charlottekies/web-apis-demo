import { procedure, router } from '../../../../trpc/trpc';
import { getAllAuthors } from '../service/authorService';

export const authorRouter = router({
  getAuthorsWithBooks: procedure.query(async () => {
    return await getAllAuthors({books: true});
  }),
});