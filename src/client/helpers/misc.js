import { S3 } from "../globals"
import { includes } from "lodash"

export const pipe = x => (...funcs) => funcs.reduce((val, func) => func(val), x)

export const stringify = obj => JSON.stringify(obj)
export const stringifyFormat = (obj, spaces) => JSON.stringify(obj, undefined, spaces)

export const curryMap = func => collection => collection.map(func)
export const curryFilter = func => collection => collection.filter(func)
export const curryReduce = (func, accumulator) => collection => collection.reduce(func, accumulator)

export const isLength = (str, length) => str.length === length
export const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export const catalogUrl = id => `${S3}/${id}.jpg`

export const show = array => item => !includes(array, item)
