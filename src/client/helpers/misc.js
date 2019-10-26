export const pipe = x => (...funcs) => funcs.reduce((val, func) => func(val), x)

export const stringify = obj => JSON.stringify(obj)
export const stringifyFormat = (obj, spaces) => JSON.stringify(obj, undefined, spaces)

export const curryMap = func => collection => collection.map(func)
export const curryFilter = func => collection => collection.filter(func)
export const curryReduce = (func, accumulator) => collection => collection.reduce(func, accumulator)

export const isLength = (str, length) => str.length === length
export const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export const deserializeDate = unixTimeStamp => {
  const date = new Date(unixTimeStamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`
  return [day, month, year].join('-')
}
