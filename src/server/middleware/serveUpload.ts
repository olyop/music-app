import { RequestHandler } from "express"
import { UPLOAD_ENTRY_PATH } from "../globals"

export const serveUpload = (): RequestHandler =>
	(req, res, nxt) => {
		res.sendFile(UPLOAD_ENTRY_PATH)
	}