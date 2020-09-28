import fs from "fs"
import path from "path"

import { SQL_FOLER_PATH } from "../globals"

const importSql = (folder: string) => (fileName: string) =>
	fs.readFileSync(path.join(SQL_FOLER_PATH, folder, `${fileName}.sql`)).toString()

export default importSql