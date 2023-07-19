/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // if the header `x-authorized` is present and
            // contains a matching value, this redirect will be applied
            {
                source: '/',
                has: [
                    {
                        type: 'header',
                        key: 'x-authorized',
                    },
                ],
                permanent: false,
                destination: '/dashboard',
            },
            // if the header `x-authorized` is NOT present and
            // contains a matching value, this redirect will be applied
            {
                source: '/',
                missing: [
                    {
                        type: 'header',
                        key: 'x-authorized',
                    },
                ],
                permanent: false,
                destination: '/auth/login',
            },
        ]
    },
}


module.exports = nextConfig
