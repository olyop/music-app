// import fs from "fs"
// import path from "path"
import morgan from "morgan"

import { LOG_FORMAT } from "../globals"
// import { IS_DEV, ROOT_PATH, LOG_FORMAT } from "../globals"

export const logger = () =>
	morgan(LOG_FORMAT)

// const logFilePath = path.join(ROOT_PATH, "access.log")

// const stream = fs.createWriteStream(logFilePath, { flags: "a" })

// export const logger = () =>
// 	(IS_DEV ? morgan(LOG_FORMAT) : morgan("combined", { stream }))