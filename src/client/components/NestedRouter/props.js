import { string, arrayOf, object } from "prop-types"

export const propTypes = {
  path: string,
  routes: arrayOf(object),
}

export const defaultProps = {
  path: "",
}
