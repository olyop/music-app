import isEmpty from "lodash/isEmpty"
import inRange from "lodash/inRange"
import isString from "lodash/isString"

export const isStringLengthInRange =
	(start: number, end: number) =>
		(val: string) =>
			inRange(val.length, start, end)

export const isUuid = (val: string) =>
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val)

export const isStringLength = (length: number) => (val: string) =>
	val.length === length

export const isNotEmpty = (val: unknown) =>
	!isEmpty(val)

export const validateArray =
	<T>(validator: (val: T) => boolean) =>
		(arr: T[]) =>
			arr.map(val => validator(val))
				.every(Boolean)

export const validateId = (id: string) =>
	isStringLength(36)(id) &&
	isString(id) &&
	isUuid(id)

export const validateArrayOfIds = (ids: string[]) =>
	validateArray(isString)(ids) &&
	validateArray(isStringLength(36))(ids) &&
	validateArray(isUuid)(ids)

export const deserializeDate = (unix: string) =>
	(new Date(unix)).toLocaleDateString()