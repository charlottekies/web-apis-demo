import { PrismaClient } from '@prisma/client'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '../trpc/routers/_app';

const prisma = new PrismaClient()

export default prisma


export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

