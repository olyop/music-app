export const handleFormChange = (form, setForm) => (key, transform) => event => {
  setForm({
    ...form,
    [key]: transform(event.target.value)
  })
}

export const handleFormSubmit = (form, initFunc, init, func) => {
  func({ variables: form })
  initFunc(init)
}
