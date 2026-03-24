import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    devIndicators: false,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://backend:8000/:path*",
            },
        ];
    },
};

export default nextConfig;
