import { mapKeys, snakeCase } from "lodash"

export const convertToSnakeCase = (obj: Record<string, unknown>): Record<string, unknown> =>
	mapKeys(obj, (_, key) => snakeCase(key))