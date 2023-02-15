import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";

export const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text} from LAMBDA`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

// created for each request
const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
