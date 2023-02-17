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

const getStory = async (name: string, theme: string) => {
  const api = new ChatGPTAPI({
    apiKey: Config.OPEN_API_KEY,
  });

  const res = await api.sendMessage(
    `Create a 2 to 3 minute bedtime story about ${name} and with ${theme} theme.`
  );
  return res.text;
};

export const appRouter = t.router({
  story: t.procedure
    .input(
      z.object({
        name: z.string(),
        theme: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await getStory(input.name, input.theme);
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
