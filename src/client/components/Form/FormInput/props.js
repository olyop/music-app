import { oneOfType, string, number, object, func, shape } from "prop-types"

export const propTypes = {
  index: number.isRequired,
  field: shape({
    id: string.isRequired,
    name: string.isRequired,
  }).isRequired,
  onFieldChange: func.isRequired,
  val: oneOfType([ string, number, object ]).isRequired,
}
