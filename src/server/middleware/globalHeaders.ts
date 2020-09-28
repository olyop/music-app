import { RequestHandler } from "express"
import { GLOBAL_HTTP_HEADERS } from "../globals"

export const globalHeaders = (): RequestHandler =>
	(req, res, nxt) => {
		res.set(GLOBAL_HTTP_HEADERS)
		nxt()
	}