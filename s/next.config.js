// next.config.js

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  experimental: {
    serverExternalPackages: ['bcryptjs'],
  },
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : undefined,
  
  // Cloudinary 이미지 설정 추가
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
