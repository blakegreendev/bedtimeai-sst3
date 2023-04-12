import { StackContext, Api, NextjsSite, Config } from "sst/constructs";

export function SST3({ stack }: StackContext) {
  const OPEN_API_KEY = new Config.Secret(stack, "OPEN_API_KEY");
  const api = new Api(stack, "api", {
    routes: {
      "POST /trpc/{proxy+}": {
        function: {
          handler: "packages/functions/src/trpc.handler",
          runtime: "nodejs18.x",
          timeout: 60,
          nodejs: {
            install: ["openai"],
          },
        },
      },
    },
  });
  api.bind([OPEN_API_KEY]);
  const site = new NextjsSite(stack, "site", {
    path: "sst3-frontend",
    environment: {
      NEXT_API_ENDPOINT: api.url,
    },
    customDomain: {
      hostedZone: "blakegreen.dev",
      domainName: "bedtimeai.blakegreen.dev",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  stack.addOutputs({
    SiteEndpoint: site.url || "localhost",
  });
}
