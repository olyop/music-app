import { isString } from "lodash"
import { NIL_UUID } from "../../globals/miscellaneous.js"

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const isUuid = (uuid: string) =>
	isString(uuid) &&
	(uuidRegex.test(uuid) || NIL_UUID === uuid)