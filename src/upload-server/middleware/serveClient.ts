import { RequestHandler } from "express"
import { CLIENT_ENTRY_PATH } from "../globals"

export const serveClient =
	(): RequestHandler => (_req, res) => {
		res.sendFile(CLIENT_ENTRY_PATH)
	}