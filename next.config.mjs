import createNextIntlPlugin from "next-intl/plugin"
/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
      }
};

export default withNextIntl(nextConfig);
