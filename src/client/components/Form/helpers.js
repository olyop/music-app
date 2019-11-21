import { deserializeDate } from "../../helpers/misc"
import { includes, find, isEmpty } from "lodash"

export const createFormInit = fields => fields.reduce(
  (acc, { short, isDoc, init }) => ({
    ...acc,
    [short]: isDoc ? {
      val: init,
      input: "",
    } : init,
  }),
  {}
)

export const handleFieldChange = (form, setForm) => ({ type, short, parse }) => event => {
  const value = parse.in(event.target.value)
  setForm({
    ...form,
    [short]: type === "list" ? {
      ...form[short],
      input: value,
    } : value,
  })
}

export const handleFieldDocRemove = (form, setForm) => ({ type, short }) => ({ id }) => () => {
  setForm({
    ...form,
    [short]: {
      ...form[short],
      val: type === "list" ? form[short].val.filter(doc => doc !== id) : "",
    },
  })
}

export const handleFormSubmit = (form, initFunc, init, submitFunc) => {
  submitFunc({ variables: form })
  initFunc(init)
}

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
    return "(0[1-9]|1[0-9]|2[0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}"
  } else {
    return undefined
  }
}

export const determineRequired = ({ type, req }) => {
  if (type === "list") {
    return undefined
  } else {
    return req
  }
}

export const determineDisabled = ({ type, isDoc }, val) => {
  if (type !== "list" && isDoc && !isEmpty(val.val)) {
    return true
  } else {
    return undefined
  }
}

export const determineFieldVal = ({ short }, form) => form[short]

export const determineFieldDoc = (id, db) => find(db, { id })

export const determineInputVal = ({ type, isDoc, parse }, val) => {
  if (isDoc) {
    return parse.out(val.input)
  } else if (type === "date") {
    return deserializeDate(parse.out(val))
  } else {
    return val
  }
}

export const determineValidatorVal = ({ isDoc }, val) => {
  if (isDoc) {
    return val.val
  } else {
    return val
  }
}

export const validateForm = () => {
  return true
}
