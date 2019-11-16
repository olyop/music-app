import { includes, find } from "lodash"

export const createFormInit = fields => fields.reduce(
  (acc, { short, isDoc, db, init }) => ({
    ...acc,
    [short]: isDoc ? {
      db,
      val: init,
      input: ""
    } : init
  }),
  {}
)

export const handleFieldChange = (form, setForm) => ({ type, short, parse }) => event => {
  const value = parse.in(event.target.value)
  setForm({
    ...form,
    [short]: type === "list" ? {
      ...form[short],
      input: value
    } : value
  })
}

export const handleFieldDocRemove = (form, setForm) => ({ short }) => ({ id }) => () => {
  setForm({
    ...form,
    [short]: {
      ...form[short],
      db: form[short].db.filter(doc => doc.id !== id)
    }
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
    return "dd-mm-yyyy"
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

export const determineFieldVal = ({ short }, form) => form[short]

export const determineFieldDoc = (id, db) => find(db, { id })

export const determineInputVal = ({ type }, val) => {
  if (type === "list") {
    return val.input
  } else {
    return val
  }
}

export const determineValidatorVal = ({ isDoc }, val) => {
  if (isDoc) return val.val
  else return val
}

export const validateForm = () => {
  return true
}
