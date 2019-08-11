import { isString, isSafeInteger, inRange, isArray } from "lodash/fp"
import { isLength, isHex, validateArray } from "../../../helpers/misc"

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
