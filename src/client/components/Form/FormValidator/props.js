import {
  func,
  node,
  shape,
  object,
  string,
  oneOfType,
} from "prop-types"

export const propTypes = {
  validator: shape({
    id: string.isRequired,
    msg: string.isRequired,
    check: func.isRequired,
  }).isRequired,
  val: oneOfType([ node, object ]).isRequired,
}
