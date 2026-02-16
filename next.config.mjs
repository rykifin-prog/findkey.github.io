/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
  // We intentionally do not set `output: 'export'` so auth/paywall flows can use
  // server-side logic in future phases without migration work.
};

export default nextConfig;
