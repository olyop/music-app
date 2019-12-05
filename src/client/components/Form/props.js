import { string, arrayOf, object, func } from "prop-types"

export const propTypes = {
  title: string,
  submitText: string,
  submit: func.isRequired,
  fields: arrayOf(object).isRequired,
}

export const defaultProps = {
  title: "Form",
  submitText: "Submit",
}
