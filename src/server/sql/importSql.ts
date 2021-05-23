import fs from "fs"
import path from "path"

import { SQL_PATH } from "../globals"

const importSql =
	(folder: string) =>
		(fileName: string) =>
			fs.readFileSync(path.join(SQL_PATH, folder, `${fileName}.sql`))
				.toString()

export default importSql