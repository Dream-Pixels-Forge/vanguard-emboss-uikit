import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src'],
            exclude: ['src/App.tsx', 'src/main.tsx'],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/components/ui/index.ts'),
            name: 'VanguardEmbossUI',
            formats: ['es', 'cjs'],
            fileName: function (format) { return "vanguard-emboss-uikit.".concat(format, ".js"); },
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'class-variance-authority',
                'clsx',
                'tailwind-merge',
                'lucide-react',
                '@radix-ui/react-checkbox',
                '@radix-ui/react-dialog',
                '@radix-ui/react-label',
                '@radix-ui/react-navigation-menu',
                '@radix-ui/react-radio-group',
                '@radix-ui/react-select',
                '@radix-ui/react-slider',
                '@radix-ui/react-switch',
                '@radix-ui/react-tabs',
                '@radix-ui/react-accordion',
                '@radix-ui/react-dropdown-menu',
                '@radix-ui/react-popover',
                '@radix-ui/react-slot',
                '@radix-ui/react-tooltip',
                '@radix-ui/react-progress',
                '@radix-ui/react-avatar',
                '@radix-ui/react-toggle-group',
                '@radix-ui/react-collapsible',
                'sonner',
            ],
        },
        cssCodeSplit: false,
    },
});
