import { string, func, arrayOf, object } from "prop-types"

export const propTypes = {
  title: string,
  submitText: string,
  rememberText: string,
  submit: func.isRequired,
  fields: arrayOf(object).isRequired,
}

export const defaultProps = {
  title: "Form",
  submitText: "Submit",
  rememberText: "Remember fields",
}
