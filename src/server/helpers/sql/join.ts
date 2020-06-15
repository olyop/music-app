import { isNull } from "lodash"

export const join = (names: string[], prefix: string | null = null) =>
	(isNull(prefix) ? "" : `${prefix}.`) +
	names.join(isNull(prefix) ? ", " : `, ${prefix}.`)