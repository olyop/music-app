import filter from "lodash/filter"
import includes from "lodash/includes"
import isUndefined from "lodash/isUndefined"

import { OrderByIgnore } from "../types"

export const enumToString = (obj: Record<string, unknown>, ignoreKeys?: OrderByIgnore) => {
	const keys = Object.keys(obj)
	if (isUndefined(ignoreKeys)) {
		return keys
	} else {
		return filter(keys, key => !includes(ignoreKeys, key))
	}
}