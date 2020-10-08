import { RequestHandler } from "express"
import { CLIENT_ENTRY_PATH } from "../globals"

export const serveClient = (): RequestHandler =>
	(req, res, nxt) => {
		res.sendFile(CLIENT_ENTRY_PATH)
	}