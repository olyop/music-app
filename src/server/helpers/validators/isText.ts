import { isEmpty, isString } from "lodash"

export const isText = (text: string, canBeEmpty = false) => (
	isString(text) &&
	(canBeEmpty ? true : !isEmpty(text)) &&
	text.length <= 2048
)