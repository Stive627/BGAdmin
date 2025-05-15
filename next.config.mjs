/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'blackgold-bucket.s3.ap-south-1.amazonaws.com',
            port: '',
            pathname: '/**',
            search: '',
          }
        ],
      }
}

export default nextConfig;
