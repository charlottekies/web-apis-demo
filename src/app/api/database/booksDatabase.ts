import { Return } from "@prisma/client/runtime/library";
import prisma from "../../../../server/prisma";

export interface FindAllBooksProps {
  includeAuthor?: boolean,
  includeImage?: boolean
}

export const findAllBooks = async (props: FindAllBooksProps) => {
  return await prisma.book.findMany({
    take: 50,
    include: {
      book_author: {
        include: {
          author: props.includeAuthor,
        },
      },
    },
    orderBy: {title: "asc"}
  });
}
export type PrismaBooks = Awaited<ReturnType<typeof findAllBooks>>

export const findBookById = async ({ bookId }: { bookId: number }) => {
  return await prisma.book.findUnique({
    where: { book_id: bookId },
  });
}
