import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: { '~@ibm': path.resolve(__dirname, './node_modules/@ibm') }
    },
    server: {
        proxy: {
            '/api': 'http://localhost:5230'
        }
    }
});
