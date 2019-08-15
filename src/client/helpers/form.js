import { inRange } from "lodash"

export const validateArray = validator => arr => arr.reduce(
  (acc, val) => validator(val),
  true
)

export const isStringLengthInRange = (start, end) => str => inRange(str.length, start, end)

export const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export const isStringLength = length => str => str.length === length

export const handleFormChange = (form, setForm) => (key, transform) => event => {
  setForm({
    ...form,
    [key]: transform(event.target.value)
  })
}

export const handleFormSubmit = (form, initFunc, init, submitFunc) => {
  submitFunc({ variables: form })
  initFunc(init)
}

export const determineInputType = type => {
  switch (type) {
    case "text": return "text"
    case "list": return "text"
    case "date": return "date"
    case "num": return "number"
    case "int": return "number"
    default: return "text"
  }
}

export const determineBoundaries = (type, min, max, minLength, maxLength) => {
  if (type === "int" || type === "num" || type === "date") {
    return { min, max }
  } else if (type === "text" || type === "list") {
    return { minLength, maxLength }
  } else {
    return {}
  }
}

export const deserializeDate = date => (new Date(date)).toLocaleDateString()

export const createFormInit = fields => fields.reduce(
  (init, field) => ({
    ...init,
    [field.camelCase]: field.init 
  }),
  {}
)

