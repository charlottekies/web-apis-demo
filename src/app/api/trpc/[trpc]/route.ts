
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../../../../../trpc/context";
import { appRouter } from "../../../../../trpc/routers/_app";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createContext,
  });
};

export { handler as GET, handler as POST };