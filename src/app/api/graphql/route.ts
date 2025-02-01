import { startServerAndCreateNextHandler } from '@as-integrations/next';
import prisma from '../../../../server/prisma';
import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { getAllBooks } from '../service/bookService';

/** 
 * This is the GraphQL Schema. 
* 
* The typeDefinitions in the GraphQL schema define: 
*   1. the structure of the requests clients can make,
*   2. and the structure of the responses they will receive.
* 
* The schema specifies query names and their input params, and their output return type
* In this case, the schema defines that the client can query books or authors.
* The client can request all or some of the properties defined in the Book and Author types. 
* In this way, requests are said to be dynamic
**/
const typeDefs = gql`
  type Query {
   books(includeAuthor: Boolean, skip: Int, take: Int): [Book!]!
   authors(includeBooks: Boolean, skip: Int, take: Int): [Author!]!
  }

  type Book {
    book_id: Int!
    title: String!
    book_author: Author
    coverImageUrl: String
  }

  type Author {
    author_id: Int!
    author_name: String!
    books: [Book!] 
  }
`;

/**  
* Resolvers handle query, mutation, and subscription requests defined in the schema. 
* 
* The info argument in a resolver provides the query's field selection, allowing you to fetch only what's requested.
**/
const resolvers = {
  Query: {
    authors: async (_: any, { includeBooks = false, skip = 0, take = 50 }) => {
      const authors = await prisma.author.findMany({
        take,
        skip,
        include: {
          book_author: includeBooks,
        },
      });

      const authorsWithBooks = await Promise.all(
        authors.map(async (author) => {
          const books = includeBooks
            ? await Promise.all(
                author.book_author.map(async (bookAuthor) => {
                  const book = await prisma.book.findUnique({
                    where: { book_id: bookAuthor.book_id },
                  });
                  return {
                    book_id: book?.book_id,
                    title: book?.title,
                  };
                })
              )
            : [];

          return {
            author_id: author.author_id,
            author_name: author.author_name,
            books: books,
          };
        })
      );

      return authorsWithBooks;
    },
    books: async (_: any, { includeAuthor = false, skip = 0, take = 50 }: { includeAuthor?: boolean, skip?: number, take?: number }) => {
      return await getAllBooks({includeAuthor, includeImage: true})
    }
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create handler for GraphQL
const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ prisma }),
});

// Named export for HTTP methods
export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}
