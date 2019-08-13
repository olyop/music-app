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

export const deserializeDate = date => (new Date(date)).toLocaleDateString()

export const createFormInit = fields => fields.reduce(
  (init, field) => ({
    ...init,
    [field.camelCase]: field.init 
  }),
  {}
)
