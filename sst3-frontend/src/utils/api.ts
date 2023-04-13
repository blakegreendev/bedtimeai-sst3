/**
 * This is the client-side entrypoint for your tRPC API.
 * It is used to create the `api` object which contains the Next.js
 * App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types
 */
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import type { AppRouter } from "../../../packages/functions/src/trpc";

/** A set of type-safe react-query hooks for your tRPC API. */
export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          // url: `${process.env.NEXT_API_ENDPOINT}/trpc`,
          // dev endpoint
          url: "https://4yidn40b2d.execute-api.us-east-1.amazonaws.com/trpc",
          // prod endpoint
          //url: "https://0ckgl1ij9d.execute-api.us-east-1.amazonaws.com/trpc",
        }),
      ],
    };
  },
  ssr: true,
});
