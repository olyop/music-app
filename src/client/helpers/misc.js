import { toString } from "lodash"

export const pipe = x => (...funcs) => funcs.reduce((val, func) => func(val), x)

export const stringify = obj => JSON.stringify(obj)
export const stringifyFormat = (obj, spaces) => JSON.stringify(obj, undefined, spaces)

export const curryMap = func => collection => collection.map(func)
export const curryFilter = func => collection => collection.filter(func)
export const curryReduce = (func, accumulator) => collection => collection.reduce(func, accumulator)

export const isLength = (str, length) => str.length === length
export const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export const deserializeDate = unixTimeStamp => {
  const date = new Date(unixTimeStamp * 1000)
  const year = toString(date.getFullYear())
  let day = date.getDate()
  let month = date.getMonth() + 1
  if (day <= 9) day = toString(`0${day}`)
  if (month <= 9) month = toString(`0${month}`)
  return [day, month, year].join("/")
}

export const deserializeDuration = duration => {
  const minutes = Math.floor(duration / 60)
  let seconds = duration % 60
  if (seconds <= 9) seconds = `0${seconds}`
  return `${minutes}:${seconds}`
}

export const catalogUrl = id => `/images/catalog/${id}.jpg`
