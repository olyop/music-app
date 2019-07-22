import { compose } from "redux"
import { sortBy } from "lodash"

export const pipe = x => (...funcs) => funcs.reduce((val, func) => func(val), x)

export const stringify = obj => JSON.stringify(obj)
export const stringifyFormat = (obj, spaces) => JSON.stringify(obj, undefined, spaces)

export const log = message => console.log(stringifyFormat(message, 2))

export const curryMap = func => collection => collection.map(func)
export const curryFilter = func => collection => collection.filter(func)
export const curryReduce = (func, accumulator) => collection => collection.reduce(func, accumulator)
export const curryConcat = newItem => collection => collection.concat(newItem)
export const currySortBy = func => collection => sortBy(collection, func)

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
