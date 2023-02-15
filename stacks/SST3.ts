import { StackContext, Api, NextjsSite } from "sst/constructs";

export function SST3({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /trpc/{proxy+}": {
        function: {
          handler: "packages/functions/src/trpc.handler",
          runtime: "nodejs18.x",
        },
      },
    },
  });
  const site = new NextjsSite(stack, "site", {
    path: "sst3-frontend",
    environment: {
      NEXT_API_ENDPOINT: api.url,
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
