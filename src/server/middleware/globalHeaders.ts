import { Request, Response, NextFunction } from "express"

import { GLOBAL_HTTP_HEADERS } from "../globals"

export const globalHeaders = () =>
	(req: Request, res: Response, nxt: NextFunction): void => {
		res.set(GLOBAL_HTTP_HEADERS)
		nxt()
	}