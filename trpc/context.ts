// import { createTRPCContext } from "@trpc/server";
import { type inferAsyncReturnType } from "@trpc/server";

export const createContext = async () => {
  const ctx = {}

  return ctx;
};

export type Context = typeof createContext;