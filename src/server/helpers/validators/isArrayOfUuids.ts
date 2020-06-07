import { isEmpty } from "lodash"
import { every } from "lodash/fp"

import { isUuid } from "./isUuid"

export const isArrayOfUuids = (ids: string[]) => (
	Array.isArray(ids) &&
	(isEmpty(ids) ? true : every(isUuid))
)