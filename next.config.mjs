import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'ykinnovations.com',
      },
      {
        protocol: 'https',
        hostname: '*.netlify.app',
      },
    ],
    dangerouslyAllowSVG: true,
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [64, 128, 256, 384, 512],
  },
  compress: true,
  experimental: {
    optimizePackageImports: ['payload', '@payloadcms/next', '@react-three/drei'],
  },
}

export default withPayload(nextConfig, {
  configPath: './src/payload.config.ts',
})
