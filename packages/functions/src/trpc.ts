import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";
import superjson from "superjson";
import { Config } from "sst/node/config";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: Config.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const t = initTRPC.create({ transformer: superjson });

export const appRouter = t.router({
  story: t.procedure
    .input(
      z.object({
        name: z.string(),
        theme: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // max_tokens: 10,
        messages: [
          {
            role: "user",
            content: `Create a bedtime story about ${input.name} with the theme of ${input.theme}`,
          },
        ],
      });

      console.log(response.data);
      return response.data;
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
