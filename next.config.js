/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
})
const nextConfig = {
  images: {
    domains: [
      // 'storage.yandexcloud.net',
      'staging-it-incubator.s3.eu-central-1.amazonaws.com',
    ],
  },
  env: {
    NEXT_PUBLIC_RECAPTCHA_SECRET_KEY:
      process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = withPWA(nextConfig);
