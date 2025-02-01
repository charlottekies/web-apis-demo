import { createCallerFactory, mergeRouters, router } from "../trpc";
import publicProcedure from "../procedures/public";
import { createContext } from "../context";
import { authorRouter } from "../../src/app/api/trpc/authorRouter"
import { bookRouter } from "@/app/api/trpc/bookRouter";

// this is a sample router. 
export const helloRouter = router({
  sayHello: publicProcedure.query(({ ctx }) => {
    console.log('here')
    return { greeting: `Hello World!` };
  }),
});

export const appRouter = mergeRouters(helloRouter, bookRouter, authorRouter);

export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;