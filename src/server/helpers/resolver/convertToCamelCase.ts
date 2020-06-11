import { mapKeys, camelCase } from "lodash"

export const convertToCamelCase = (obj: Record<string, unknown>): Record<string, unknown> =>
	mapKeys(obj, (_, key) => camelCase(key))