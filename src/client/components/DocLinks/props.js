import { arrayOf, object, string } from "prop-types"

export const propTypes = {
  path: string.isRequired,
  docs: arrayOf(object).isRequired,
}
