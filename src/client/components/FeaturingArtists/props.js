import { arrayOf, object } from "prop-types"

export const propTypes = {
  artists: arrayOf(object).isRequired,
  featuring: arrayOf(object).isRequired,
}
