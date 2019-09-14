import { includes } from "lodash"

export const handleFormChange = (form, setForm) => ({ type, short, parse }) => event => {
  const value = parse.in(event.target.value)
  setForm({
    ...form,
    [short]: type === "list" ? {
      ...form[short],
      input: value
    } : value
  })
}

export const handleItemRemove = (form, setForm) => ({ short }) => ({ id }) => () => {
  setForm({
    ...form,
    [short]: {
      ...form[short],
      list: form[short].list.filter(item => item.id !== id)
    }
  })
}

export const handleFormSubmit = (form, initFunc, init, submitFunc) => {
  submitFunc({ variables: form })
  initFunc(init)
}

export const createFormInit = fields => fields.reduce(
  (acc, { type, short, init }) => ({
    ...acc,
    [short]: type === "list" ? {
      input: "",
      list: init
    } : init
  }),
  {}
)

export const determineInputType = ({ type }) => {
  if (includes(["text","list"], type)) {
    return "text"
  } else if (type === "date") {
    return "date"
  } else if (includes(["num","int"], type)) {
    return "number"
  } else {
    return undefined
  }
}

export const determineMin = ({ type, min }) => {
  if (includes(["int","num","date"], type)) {
    return min
  } else {
    return undefined
  }
}

export const determineMax = ({ type, max }) => {
  if (includes(["int","num","date"], type)) {
    return max
  } else {
    return undefined
  }
}

export const determineMinLength = ({ type, min }) => {
  if (includes(["text","list"], type)) {
    return min
  } else {
    return undefined
  }
}

export const determineMaxLength = ({ type, max }) => {
  if (includes(["text","list"], type)) {
    return max
  } else {
    return undefined
  }
}

export const determinePattern = ({ type }) => {
  if (type === "date") {
    return "dd-mm-yyyy"
  } else {
    return undefined
  }
}

export const determineFieldVal = ({ short }, form) => form[short]

export const determineInputVal = ({ type, doc, parse }, val) => {
  if (type === "list") {
    return parse.out(val.input)
  } else if (doc) {
    return val.name
  } else {
    return parse.out(val)
  }
}

export const determineValidatorVal = ({ type, doc }, val) => {
  if (type === "list") {
    return val.list.map(({ id }) => id)
  } else if (doc) {
    return val.id
  } else {
    return val
  }
}

export const determineRequired = ({ type, req }) => {
  if (type === "list") {
    return undefined
  } else {
    return req
  }
}

export const validateForm = (form, fields) => {
  console.log(form)
  return fields.reduce(
    (isValid, { short, validators }) => (
      isValid = validators.reduce(
        (isFieldValid, { check }) => {
          isFieldValid = check(form[short])
        },
        true
      )
    ),
    true
  )
}
