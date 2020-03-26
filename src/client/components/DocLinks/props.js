import { string, bool, arrayOf, object } from "prop-types"

export const propTypes = {
  path: string.isRequired,
  ampersand: bool.isRequired,
  docs: arrayOf(object).isRequired,
}
