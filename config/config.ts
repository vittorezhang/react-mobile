import { defineConfig } from 'umi';

import proxy from './proxy/index';
import routes from './routes/index';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
    base: '/',
    publicPath: '/mobile/',
    outputPath: 'dist/mobile',
    hash: true,
    history: {
        type: 'hash',
    },
    routes: routes,
    proxy: proxy[REACT_APP_ENV],
    dynamicImport: {},
});
