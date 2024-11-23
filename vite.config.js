import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin({ useStrictCSP: true, relativeCSSInjection: false }),
        dts({ rollupTypes: true }),
    ],
    build: {
        lib: {
            name: 'vue-kanban',
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: format => `vue-kanban.${format}.js`,
        },
        emptyOutDir: true,
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
