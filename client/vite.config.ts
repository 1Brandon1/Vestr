import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	server: {
		port: 3000
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
	}
})
