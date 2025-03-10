/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',// This is required in order to Generate a static export
    images: { unoptimized: true }, // This is required in order to Generate a static export
};

export default nextConfig;
