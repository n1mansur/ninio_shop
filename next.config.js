/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')
const path = require('path')

const nextConfig = nextTranslate({
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: [''],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
      @import "./src/styles/breakpoints.scss";
      @import "./src/styles/mixins.scss";
      @import "./src/styles/unit.scss";
      `,
  },
})

module.exports = nextConfig
