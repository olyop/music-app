export const pipe = x => (...funcs) => funcs.reduce((val, func) => func(val), x)

export const stringify = obj => JSON.stringify(obj)
export const stringifyFormat = (obj, spaces) => JSON.stringify(obj, undefined, spaces)

export const curryMap = func => collection => collection.map(func)
export const curryFilter = func => collection => collection.filter(func)
export const curryReduce = (func, accumulator) => collection => collection.reduce(func, accumulator)

export const isLength = (str, length) => str.length === length
export const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export const catalogUrl = id => `/images/catalog/${id}.jpg`

export const copyToClipboard = str => {
  const el = document.createElement("textarea")
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}
