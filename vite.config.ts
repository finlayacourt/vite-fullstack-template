import { defineConfig } from "vite"

export default defineConfig({
	build: {
		outDir: "dist/client",
	},
	plugins: [
		{
			name: "server",
			configureServer(vite) {
				vite.middlewares.use(async (req, res, next) => {
					if (req.url!.startsWith("/api")) {
						let { handle } = await vite.ssrLoadModule("./server.ts")
						return handle(req, res)
					}
					next()
				})
			},
			async configurePreviewServer(vite) {
				let path = "./dist/server/server.js"
				let { handle } = await import(path)
				vite.middlewares.use((req, res, next) => {
					if (req.url!.startsWith("/api")) {
						return handle(req, res)
					}
					next()
				})
			},
		},
	],
})
