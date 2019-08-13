import { inRange } from "lodash"

export const validateArray = validator => arr => arr.reduce(
  (acc, val) => validator(val),
  true
)

export const isStringLengthInRange = (start, end) => str => inRange(str.length, start, end)

export const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export const isStringLength = length => str => str.length === length
