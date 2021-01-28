import { RequestHandler } from "express"
import { CLIENT_ENTRY_PATH } from "./globals"

const serveClient = (): RequestHandler =>
	(req, res, nxt) => {
		res.sendFile(CLIENT_ENTRY_PATH)
	}

export default serveClient