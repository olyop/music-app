import { RequestHandler } from "express"
import { BUILD_CLIENT_ENTRY_PATH } from "../globals"

export const serveIndex = (): RequestHandler =>
	(req, res, nxt) => {
		res.sendFile(BUILD_CLIENT_ENTRY_PATH)
	}