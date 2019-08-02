export const noopValue = val => val

export const pipe = x => (...funcs) => funcs.reduce((val, func) => func(val), x)

export const stringify = obj => JSON.stringify(obj)
export const stringifyFormat = (obj, spaces) => JSON.stringify(obj, undefined, spaces)

export const curryMap = func => collection => collection.map(func)
export const curryFilter = func => collection => collection.filter(func)
export const curryReduce = (func, accumulator) => collection => collection.reduce(func, accumulator)
