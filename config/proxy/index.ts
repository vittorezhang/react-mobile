export default {
    local: {
        '/api/': {
            target: 'http://192.168.99.29:38898',
            changeOrigin: true,
            pathRewrite: {
                '^/api/': '/',
            },
        },
    },
    lan: {
        '/api/': {
            target: 'http://192.168.2.91:8889',
            changeOrigin: true,
            pathRewrite: {
                '^/api/': '/',
            },
        },
    },
    dev: {
        '/api/': {
            target: 'https://zmp-test.nbm2m.com',
            changeOrigin: true,
            pathRewrite: { '^': '' },
        },
    },
};
