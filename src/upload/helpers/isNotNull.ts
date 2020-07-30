import isNull from "lodash/isNull"

export const isNotNull = (val: unknown) =>
	!isNull(val)