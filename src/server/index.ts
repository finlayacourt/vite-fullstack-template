import cac from "cac"
import { createServer } from "http"
import { handle } from "./start"

let cli = cac("mealbooking")

cli
	.command("serve", "locally preview production build")
	.option("--host [host]", `[string] specify hostname`)
	.option("--port <port>", `[number] specify port`)
	.action(async (options: { host?: string; port?: number }) => {
		let server = createServer(handle).listen(options.port, options.host, () => {
			console.log(`Listening on`, server.address())
		})
	})

cli.help()
cli.parse()

export { handle }
