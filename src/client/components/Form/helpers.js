import deserializeDate from "../../helpers/deserializeDate"
import { includes, find, isEmpty, concat, isNumber, mapValues, isObject } from "lodash"

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

export const handleFieldChange = (form, setForm) => ({ isDoc, short, parse }) => event => {
  const value = parse.in(event.target.value)
  setForm({
    ...form,
    [short]: isDoc ? {
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

export const handleFieldHitClick = (form, setForm) => ({ type, isDoc, short }) => ({ id }) => () => {
  setForm({
    ...form,
    [short]: isDoc ? {
      ...form[short],
      input: "",
      val: type === "list" ? concat(form[short].val, id) : id,
    } : id,
  })
}

export const deserializeForm = form => mapValues(
  form,
  field => {
    if (isObject(field)) {
      return field.val
    } else {
      return field
    }
  }
)

export const handleFormSubmit = (form, initFunc, init, submitFunc) => event => {
  event.preventDefault()
  submitFunc({ variables: deserializeForm(form) })
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

export const determineDisabled = ({ type, isDoc }, val) => {
  if (type !== "list" && isDoc && !isEmpty(val.val)) {
    return true
  } else {
    return undefined
  }
}

export const determineTabIndex = index => index + 1

export const determineFieldVal = ({ short }, form) => form[short]

export const determineFieldDoc = (id, { db }) => find(db, { id })

export const determineInputVal = ({ type, isDoc, parse }, val) => {
  let out
  if (isDoc) {
    out = val.input
  } else if (type === "date") {
    out = deserializeDate(val)
  } else {
    out = val
  }
  return parse.out(out)
}

export const determineValidatorVal = ({ isDoc }, val) => {
  if (isDoc) {
    return val.val
  } else {
    return val
  }
}

export const determineValidatorVisibility = ({ isDoc }, val) => {
  if (isDoc) {
    return isEmpty(val.val)
  } else if (isNumber(val)) {
    return false
  } else {
    return isEmpty(val)
  }
}

export const validateForm = () => {
  return true
}
