import { RequestHandler } from "express"
import { CLIENT_ENTRY_PATH } from "./globals"

const serveClient = (): RequestHandler =>
	(_req, res) => {
		res.sendFile(CLIENT_ENTRY_PATH)
	}

export default serveClient