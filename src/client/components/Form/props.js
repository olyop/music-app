import { string, arrayOf, object } from "prop-types"

export const propTypes = {
  title: string,
  submitText: string,
  submitFunc: func.isRequired,
  fields: arrayOf(object).isRequired,
}

export const defaultProps = {
  title: "Form",
  submitText: "Submit",
}
