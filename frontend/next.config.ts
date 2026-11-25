import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  async redirects() {
    return [{ source: "/", destination: "/ru", permanent: false }];
  },
};

export default config;
