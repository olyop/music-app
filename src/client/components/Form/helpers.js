import deserializeDate from "../../helpers/deserializeDate"
import { includes, find, isEmpty, concat, isNumber } from "lodash"

export const createFormInit = fields => fields.reduce(
  (acc, { type, short, isDoc, init }) => ({
    ...acc,
    [short]: isDoc ? {
      val: init,
      input: "",
    } : (type === "file" ? { value: init } : init),
  }),
  {},
)

export const determineFormValid = (fields, form) => fields.reduce(
  (isValid, field) => {
    const { short, req, isDoc, type } = field
    if (!req) {
      isValid = true 
    } else if (isDoc) {
      if (isEmpty(form[short].val)) {
        isValid = false
      } else {
        isValid = true
      }
    } else if (type === "int") {
      isValid = true
    } else if (isEmpty(form[short])) {
      isValid = false
    } else {
      isValid = true
    }
    return isValid
  },
  true,
)

export const handleFieldChange = (form, setForm) => ({ type, isDoc, short, parse }) => event => {
  const { value } = event.target
  const input = parse.in(type === "file" ? { file: event.target.files[0], value } : value)
  setForm({
    ...form,
    [short]: isDoc ? {
      ...form[short],
      input,
    } : input,
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

export const handleToggleRemember = (remember, setRemember) => () => setRemember(!remember)

export const deserializeForm = (fields, form) => fields.reduce(
  (doc, field) => {
    const { type, short, isDoc, parse } = field 
    const val = form[short]
    if (isDoc) {
      return {
        ...doc,
        [short]: val.val,
      }
    } else if (type === "file") {
      return {
        ...doc,
        [short]: val.file,
      }
    } else {
      return {
        ...doc,
        [short]: parse.out(val),
      }
    }
  },
  {},
)

export const createFormInitRemember = doc => ({
  ...doc,
  title: "",
  mix: "",
  duration: 1,
  discNumber: doc.discNumber,
  trackNumber: doc.trackNumber + 1,
  featuring: {
    input: "",
    val: [],
  },
  remixers: {
    input: "",
    val: [],
  },
  artists: {
    input: "",
    val: doc.artists,
  },
  genres: {
    input: "",
    val: doc.genres,
  },
  album: {
    input: "",
    val: doc.album,
  },
})

export const handleFormSubmit = (fields, init, form, setForm, remember, submit) => event => {
  event.preventDefault()
  if (determineFormValid(fields, form)) {
    const doc = deserializeForm(fields, form)
    submit(doc)
    if (remember) setForm(createFormInitRemember(doc))
    else setForm(init)
  }
}

export const determineInputType = ({ type }) => {
  if (includes(["text","list"], type)) {
    return "text"
  } else if (type === "date") {
    return "date"
  } else if (includes(["num","int"], type)) {
    return "number"
  } else if (type === "file") {
    return "file"
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

export const determineAccept = ({ type }) => {
  if (type === "file") {
    return "image/jpeg"
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
  } else if (type === "file") {
    out = val.value
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

export const validatorVisibility = ({ isDoc }, val) => {
  if (isDoc) {
    return !isEmpty(val.val)
  } else if (isNumber(val)) {
    return true
  } else {
    return !isEmpty(val)
  }
}

export const bytesToSize = bytes => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) return "0 Byte"
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`
}
