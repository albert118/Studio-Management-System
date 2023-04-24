import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: { '~@ibm': path.resolve(__dirname, './node_modules/@ibm') }
    },
    preview: {
        strictPort: true,
        https: {
            key: '../../.certs/key.pem',
            cert: '../../.certs/cert.pem'
        },
        open: true
    },
    // not required unless this config is called when serving manually
    mode: 'production'
});
