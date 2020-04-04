import { ApolloError } from "apollo-client"
import { string, func, arrayOf, object, shape, bool, instanceOf } from "prop-types"

export const propTypes = {
  result: shape({
    loading: bool.isRequired,
    error: instanceOf(ApolloError),
  }).isRequired,
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
