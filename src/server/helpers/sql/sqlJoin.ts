import { isNull } from "lodash"

export const sqlJoin = (names: string[], prefix: string | null = null) =>
	(isNull(prefix) ? "" : `${prefix}.`) +
	names.join(isNull(prefix) ? ", " : `, ${prefix}.`)