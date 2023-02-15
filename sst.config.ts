import { SSTConfig } from "sst";
import { SST3 } from "./stacks/SST3";

export default {
  config(_input) {
    return {
      name: "sst3",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(SST3);
  },
} satisfies SSTConfig;
