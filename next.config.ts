/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    domains: ["joyvil.com"],
    remotePatterns: [
    {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
    },
    ],
},
};

module.exports = nextConfig;
