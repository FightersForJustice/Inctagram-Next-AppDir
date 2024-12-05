/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // 'storage.yandexcloud.net',
      'staging-it-incubator.s3.eu-central-1.amazonaws.com',
    ],
    unoptimized: false,
  },
  env: {
    NEXT_PUBLIC_RECAPTCHA_SECRET_KEY:
    process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY,
  },
  experimental: {
    serverActions: true,
    images: {
      unoptimized: false
    }
  },
};

module.exports = nextConfig;
