import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";
import { ChatGPTAPI } from "chatgpt";
import { Config } from "sst/node/config";

export const t = initTRPC.create();

const getStory = async (input: string) => {
  const api = new ChatGPTAPI({
    apiKey: Config.OPEN_API_KEY,
  });

  const res = await api.sendMessage(`hello ${input}`);
  return res.text;
};

export const appRouter = t.router({
  hello: t.procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await getStory(input.text);
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
