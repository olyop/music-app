import fs from "fs"
import { join } from "path"

import { SQL_FOLER_PATH } from "../globals"

const importSql = (folder: string) => (path: string) =>
	fs.readFileSync(join(SQL_FOLER_PATH, folder, `${path}.sql`)).toString()

export default importSql