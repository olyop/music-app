const { sortBy, assign } = require("lodash")

const pipe = x => (...funcs) => funcs.reduce((val, func) => func(val), x)

const stringify = obj => JSON.stringify(obj)
const stringifyFormat = obj => JSON.stringify(obj, undefined, 2)

const curryMap = func => collection => collection.map(func)
const curryFilter = func => collection => collection.filter(func)
const curryReduce = (func, accumulator) => collection => collection.reduce(func, accumulator)
const curryConcat = newItem => collection => collection.concat(newItem)
const currySortBy = func => collection => sortBy(collection, func) 

assign(exports, {
  pipe,
  stringify, stringifyFormat,
  curryMap, curryFilter, curryReduce, curryConcat, currySortBy
})
