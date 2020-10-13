import fs from "fs"
import path from "path"
import morgan from "morgan"

import { ROOT_PATH } from "../globals"

const logFilePath = path.join(ROOT_PATH, "access.log")

const stream = fs.createWriteStream(logFilePath, { flags: "a" })

export const logger = () =>
	morgan("combined", { stream })