import fs from "fs"
import path from "path"
import morgan from "morgan"

import { IS_DEV, ROOT_PATH, LOG_FORMAT } from "../globals"

const logFilePath = path.join(ROOT_PATH, "access.log")

const stream = fs.createWriteStream(logFilePath, { flags: "a" })

export const logger = () =>
	(IS_DEV ? morgan(LOG_FORMAT) : morgan("combined", { stream }))