import { IncomingMessage, ServerResponse } from "http"

console.log("Started!")

export async function handle(req: IncomingMessage, res: ServerResponse) {
	res.end("Handled!")
}
