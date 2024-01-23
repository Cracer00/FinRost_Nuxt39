// @ts-ignore

import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  compressPublicAssets: {
    gzip: true,
    brotli: true,
  },
})
