import { isEmpty, inRange } from "lodash"

export const validateArray = validator => arr => {
  if (isEmpty(arr)) {
    return false
  } else {
    return arr.reduce(
      (acc, val) => validator(val),
      true
    )
  }
}

export const isStringLengthInRange = (start, end) => str => inRange(str.length, start, end)

export const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export const isStringLength = length => str => str.length === length

export const handleFormChange = (form, setForm) => (type, key, transform) => event => {
  const { value } = event.target
  setForm({
    ...form,
    [key]: type === "list" ? {
      ...form[key],
      input: transform(value)
    } : transform(value)
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

export const determineMinMax = (type, min, max) => {
  if (type === "text" || type === "list") {
    return {
      minLength: min,
      maxLength: max
    }
  } else if (type === "int" || type === "num" || type === "date") {
    return {
      min,
      max
    }
  } else {
    return undefined
  }
}

export const deserializeDate = date => (new Date(date)).toLocaleDateString()

export const createFormInit = fields => fields.reduce(
  (init, field) => ({
    ...init,
    [field.camelCase]: field.type === "list" ? {
      input: "",
      list: field.init
    } : field.init
  }),
  {}
)

export const determinePattern = type => {
  if (type === "date") {
    return "dd-mm-yyyy"
  } else {
    return undefined
  }
}

export const determineValue = (type, value, transform) => {
  if (type === "list") {
    return transform.out(value.input)
  } else {
    return transform.out(value)
  }
}

export const determineValidatorValue = (type, value) => {
  if (type === "list") {
    return value.list.map(({ name }) => name)
  } else {
    return value
  }
}
