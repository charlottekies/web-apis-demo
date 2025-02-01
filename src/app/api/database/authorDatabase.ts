import prisma from "../../../../server/prisma";


export interface FindAllAuthorsProps {
    books?: boolean
}

export const findAllAuthors = async (props: FindAllAuthorsProps) => {
return await prisma.author.findMany({
    take: 50,
    include: {
      book_author: props.books,
    },
  });
}