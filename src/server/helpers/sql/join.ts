import { isUndefined } from "lodash"

export const join = (names: string[], prefix?: string) =>
	(isUndefined(prefix) ? "" : `${prefix}.`) +
	names.join(isUndefined(prefix) ? ", " : `, ${prefix}.`)