export const handleFormChange = func => key => event => {
  func({ [key]: event.target.value })
}

export const handleFormSubmit = (form, initFunc, init) => func => event => {
  event.preventDefault()
  func({ variables: form })
  initFunc(init)
}
