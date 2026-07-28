import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/articles/reviser-bac-maths-terminale-30-jours",
        destination: "/articles/comment-reviser-bac-maths-30-jours",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
