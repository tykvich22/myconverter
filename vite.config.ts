import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssNested from 'postcss-nested';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/myconverter',
	plugins: [react()],
	css: {
		postcss: {
			plugins: [postcssNested],
		},
	},
});
