import { isUndefined } from "lodash"

export const join =
	(names: string[], prefix?: string, filter?: string) =>
		(isUndefined(prefix) ? "" : `${prefix}.`) +
		names.filter(column => (filter === undefined ? true : column !== filter))
				 .join(isUndefined(prefix) ? ", " : `, ${prefix}.`)