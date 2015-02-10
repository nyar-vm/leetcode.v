import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import { problemReadmeRenderPlugin } from './src/plugins/problemReadmeRender';

export default defineConfig({
    plugins: [problemReadmeRenderPlugin(), vue()],
    server: {
        port: 5175,
        fs: {
            allow: ['..'],
        },
    },
});
