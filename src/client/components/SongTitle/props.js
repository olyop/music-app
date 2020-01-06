import { string, arrayOf, object } from "prop-types"

export const propTypes = {
  mix: string.isRequired,
  title: string.isRequired,
  featuring: arrayOf(object).isRequired,
}
