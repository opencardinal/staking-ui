
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAINNET_PRIMARY: process.env.MAINNET_PRIMARY,
    MAINNET_SECONDARY: process.env.MAINNET_SECONDARY,
    GEO_LOCATION_API_KEY: process.env.GEO_LOCATION_API_KEY,
    BASE_CLUSTER: process.env.BASE_CLUSTER,
    BYPASS_REGION_CHECK: process.env.BYPASS_REGION_CHECK,
  },
}

module.exports = nextConfig
