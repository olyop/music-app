import { isArray, isEmpty, inRange } from "lodash"

export const is = (type, values) => {
  if (isArray(values)) {
    return values.reduce(
      (acc, val) => type === val,
      false
    )
  } else {
    return type === values
  }
}

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

export const isNotEmpty = val => !isEmpty(val)

export const handleFormChange = (form, setForm) => (type, camelCase, transform) => event => {
  const { value } = event.target
  setForm({
    ...form,
    [camelCase]: is(type, "list") ? {
      ...form[camelCase],
      input: transform(value)
    } : transform(value)
  })
}

export const handleFormSubmit = (form, initFunc, init, submitFunc) => {
  submitFunc({ variables: form })
  initFunc(init)
}

export const deserializeDate = unix => (new Date(unix)).toLocaleDateString()

export const createFormInit = fields => fields.reduce(
  (acc, { type, camelCase, init }) => ({
    ...acc,
    [camelCase]: is(type, "list") ? {
      input: "",
      list: init
    } : init
  }),
  {}
)

export const determineInputType = ({ type }) => {
  if (is(type, ["text","list"])) {
    return "text"
  } else if (is(type, "date")) {
    return "date"
  } else if (is(type, ["num", "int"])) {
    return "number"
  } else {
    return undefined
  }
}

export const determineMin = ({ type, min }) => {
  if (is(type, ["int","num","date"])) {
    return min
  } else {
    return undefined
  }
}

export const determineMax = ({ type, max }) => {
  if (is(type, ["int","num","date"])) {
    return max
  } else {
    return undefined
  }
}

export const determineMinLength = ({ type, min }) => {
  if (is(type, ["text","list"])) {
    return min
  } else {
    return undefined
  }
}

export const determineMaxLength = ({ type, max }) => {
  if (is(type, ["text","list"])) {
    return max
  } else {
    return undefined
  }
}

export const determinePattern = ({ type }) => {
  if (is(type, "date")) {
    return "dd-mm-yyyy"
  } else {
    return undefined
  }
}

export const determineInputValue = ({ type, transform }, value) => {
  if (is(type, "list")) {
    return transform.out(value.input)
  } else {
    return transform.out(value)
  }
}

export const determineValidatorValue = ({ type }, value) => {
  if (is(type, "list")) {
    return value.list.map(({ id }) => id)
  } else {
    return value
  }
}
