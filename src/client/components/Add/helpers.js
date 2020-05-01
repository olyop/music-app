import { isString, isEmpty, inRange } from "lodash"

export const isStringLengthInRange = (start, end) => str => inRange(str.length, start, end)

export const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export const isStringLength = length => str => str.length === length

export const isNotEmpty = val => !isEmpty(val)

export const validateArray = validator => arr =>
  arr.map(val => validator(val))
     .every(Boolean)

export const validateId = id =>
  isStringLength(24)(id) &&
  isString(id) &&
  isHex(id)

export const validateArrayOfIds = x =>
  validateArray(isString)(x) &&
  validateArray(isStringLength(24))(x) &&
  validateArray(isHex)(x)

export const deserializeDate = unix =>
  (new Date(unix)).toLocaleDateString()

export const noopParse = x => x
