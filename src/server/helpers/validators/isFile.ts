import { isEmpty } from "lodash"

export const isFile = (file: Buffer) => (
	Buffer.isBuffer(file) &&
	!isEmpty(file.toString())
)