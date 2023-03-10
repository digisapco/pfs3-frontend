/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.dummyjson.com'
            },
            {
                protocol: 'https',
                hostname : 'dvvjkgh94f2v6.cloudfront.net'
            }
        ]
    },
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            {
                source: '/casas-y-apartamentos/:cond/:ci-ci/:property',
                destination: '/detail/:property'
            },
            {
                source: '/casas-y-apartamentos/:params*',
                destination: '/search'
            },
            {
                source: '/casas-y-apartamentos',
                destination: '/search'
            },

            {
                source: '/proyectos-preconstruccion/:zone/:project',
                destination: '/detail/:project'
            },
            {
                source: '/proyectos-preconstruccion/:params*',
                destination: '/projects'
            },
            {
                source: '/proyectos-preconstruccion',
                destination: '/projects'
            }
        ]
    }
}

module.exports = nextConfig;
