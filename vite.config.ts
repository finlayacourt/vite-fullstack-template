import { defineConfig } from "vite"

export default defineConfig(({ mode }) => ({
	root: "./src/client",
	appType: "spa",
	build: {
		ssr: mode === "server" ? "../server/index.ts" : undefined,
		outDir: mode === "server" ? "../../dist/server" : "../../dist/client",
		emptyOutDir: true,
	},
	plugins: [
		{
			name: "server",
			configureServer(vite) {
				vite.middlewares.use(async (req, res, next) => {
					if (req.url!.startsWith("/api")) {
						let { handle } = await vite.ssrLoadModule("../server/start.ts")
						return handle(req, res)
					}
					next()
				})
			},
			async configurePreviewServer(vite) {
				let path = "./dist/server/index.js"
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
}))
