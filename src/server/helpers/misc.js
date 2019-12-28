import sortBy from "lodash/sortBy.js"

export const pipe = x => (...funcs) => funcs.reduce((val, func) => func(val), x)

export const stringify = obj => JSON.stringify(obj)
export const stringifyFormat = obj => JSON.stringify(obj, undefined, 2)

export const curryMap = func => collection => collection.map(func)
export const curryFilter = func => collection => collection.filter(func)
export const curryReduce = (func, accumulator) => collection => collection.reduce(func, accumulator)
export const curryConcat = newItem => collection => collection.concat(newItem)
export const currySortBy = func => collection => sortBy(collection, func)

export const resolver = foo => (parent, args, context, info) => foo({ parent, args, context, info })
