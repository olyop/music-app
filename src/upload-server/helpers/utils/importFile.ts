import fs from "fs"

export const importFile = (path: string) =>
	fs.readFileSync(path).toString()