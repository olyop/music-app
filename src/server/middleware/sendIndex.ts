import { Request, Response, NextFunction } from "express"

import { BUILD_ENTRY_PATH } from "../globals"

export const sendIndex = () =>
	(_req: Request, res: Response, nxt: NextFunction): void => {
		res.sendFile(BUILD_ENTRY_PATH)
		nxt()
	}