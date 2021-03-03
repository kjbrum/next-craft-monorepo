const path = require('path')
const defaultImageSizes = [
    80,
    160,
    320,
    480,
    640,
    768,
    1024,
    1280,
    1536,
    2048,
    2560,
]

const nextConfig = {
    env: {
        POSTS_PER_PAGE: 3,
    },
    images: {
        deviceSizes: defaultImageSizes,
        domains: [
            process.env.NEXT_PUBLIC_CRAFT_DOMAIN.replace(/(^\w+:|^)\/\//, ''),
            'source.unsplash.com',
        ],
    },
    webpack(config, { isServer }) {
        config.resolve.alias['@'] = path.resolve(__dirname)

        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        })

        // Fix packages that depend on fs/module module
        if (!isServer) {
            config.node = { fs: 'empty', module: 'empty' }
        }

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
