/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',  // GitHub 头像
      'lh3.googleusercontent.com',      // Google 头像
      'platform-lookaside.fbsbx.com',   // Facebook 头像
      'pbs.twimg.com',                  // Twitter 头像
    ],
  },
}

module.exports = nextConfig
