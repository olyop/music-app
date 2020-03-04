import { isString, isEmpty, inRange } from "lodash"

export const isStringLengthInRange = (start, end) => str => inRange(str.length, start, end)

export const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export const isStringLength = length => str => str.length === length

export const isNotEmpty = val => !isEmpty(val)

export const validateArray = validator => arr => {
  if (isEmpty(arr)) {
    return false
  } else {
    return arr.reduce(
      (acc, val) => validator(val),
      true,
    )
  }
}

export const validateId = x => (
  isStringLength(24)(x) &&
  isString(x) &&
  isHex(x)
)

export const validateArrayOfIds = x => (
  validateArray(isStringLength(24))(x) &&
  validateArray(isString)(x) &&
  validateArray(isHex)(x)
)

export const deserializeDate = unix => (new Date(unix)).toLocaleDateString()

export const noopParse = x => x
