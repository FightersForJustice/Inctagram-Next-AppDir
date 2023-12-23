/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.yandexcloud.net'],
  },
  env: {
    NEXT_PUBLIC_RECAPTCHA_SECRET_KEY:
      process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY,
  },
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;
