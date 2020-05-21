import { isString, isEmpty, inRange } from "lodash"

export const isStringLengthInRange = (start, end) => str =>
  inRange(str.length, start, end)

export const isUuid = uuid =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)

export const isStringLength = length => str =>
  str.length === length

export const isNotEmpty = val =>
  !isEmpty(val)

export const validateArray = validator => arr =>
  arr.map(val => validator(val))
     .every(Boolean)

export const validateId = id =>
  isStringLength(36)(id) &&
  isString(id) &&
  isUuid(id)

export const validateArrayOfIds = x =>
  validateArray(isString)(x) &&
  validateArray(isStringLength(36))(x) &&
  validateArray(isUuid)(x)

export const deserializeDate = unix =>
  (new Date(unix)).toLocaleDateString()
