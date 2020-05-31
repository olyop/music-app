import { isUndefined } from "lodash"

type IType = { name: string }
type RType = "title" | "name"

const determineDocNameKey = <T extends IType>(doc: T): RType =>
	(isUndefined(doc.name) ? "title" : "name")

export default determineDocNameKey