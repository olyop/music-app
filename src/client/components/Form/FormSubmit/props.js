import { string, object, arrayOf } from "prop-types"

export const propTypes = {
  text: string.isRequired,
  form: object.isRequired,
  fields: arrayOf(object).isRequired,
}
