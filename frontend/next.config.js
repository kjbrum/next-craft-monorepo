const path = require('path')
const defaultImageSizes = [80, 160, 320, 480, 768, 1024, 1280]

const nextConfig = {
    env: {
        POSTS_PER_PAGE: 3,
    },
    images: {
        deviceSizes: [
            ...defaultImageSizes,
            ...defaultImageSizes.map(size => size * 2),
        ],
        domains: [
            process.env.NEXT_PUBLIC_CRAFT_DOMAIN.replace(/(^\w+:|^)\/\//, ''),
            'next-craft-apollo.nyc3.cdn.digitaloceanspaces.com',
            'source.unsplash.com',
        ],
    },
    webpack(config) {
        config.resolve.alias['@'] = path.resolve(__dirname)
        return config
    },
    async redirects() {
        return [
            {
                source: '/admin',
                destination: `${process.env.NEXT_PUBLIC_CRAFT_DOMAIN}/admin`,
                permanent: true,
            },
            {
                source: '/admin/:path*',
                destination: `${process.env.NEXT_PUBLIC_CRAFT_DOMAIN}/admin/:path*`,
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
