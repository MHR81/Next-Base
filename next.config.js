
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mandavi-uploads.tor1.digitaloceanspaces.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.70.194:3002/:path*',
      },
    ];
  },
};

module.exports = nextConfig;