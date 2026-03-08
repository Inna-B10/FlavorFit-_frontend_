import type { NextConfig } from 'next'
import { SERVER_URL } from '@/shared/config/api-config/api.server'

if (!SERVER_URL) {
  throw new Error('SERVER_URL is not defined in environment variables')
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${SERVER_URL}/uploads/:path*`
      }
    ]
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'framerusercontent.com',
      //   port: ''
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'avatars.githubusercontent.com',
      //   port: ''
      // },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: ''
      }
    ]
  }
}

export default nextConfig
