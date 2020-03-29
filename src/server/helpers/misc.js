import sortBy from "lodash/sortBy.js"
import fpPipe from "fp-pipe-then"

export const pipe = x => (...funcs) => funcs.reduce((val, func) => func(val), x)
export const pipeAsync = x => (...funcs) => fpPipe(...funcs)(x)

export const stringify = obj => JSON.stringify(obj)
export const stringifyFormat = obj => JSON.stringify(obj, undefined, 2)

export const curryMap = func => collection => collection.map(func)
export const curryFilter = func => collection => collection.filter(func)
export const curryReduce = (func, accumulator) => collection => collection.reduce(func, accumulator)
export const curryConcat = newItem => collection => collection.concat(newItem)
export const currySortBy = func => collection => sortBy(collection, func)

export const resolver = callback => (parent, args, context, info) => callback({ parent, args, context, info })

export const request = callback => (req, res, nxt) => callback({ req, res, nxt })

export const dataUrl = binary => `data:image/jpeg;base64,${binary.toString("base64")}`

export const userQueueSelect = { prev: 1, current: 1, next: 1, queue: 1 }
