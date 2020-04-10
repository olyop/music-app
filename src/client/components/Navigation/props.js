import { string, arrayOf, object, shape } from "prop-types"

export const propTypes = {
  className: string,
  ignore: arrayOf(string),
  routes: arrayOf(object).isRequired,
  match: shape({ path: string.isRequired }).isRequired,
}

export const defaultProps = {
  ignore: [],
  className: undefined,
}
