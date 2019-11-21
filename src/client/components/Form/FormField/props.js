import {
  bool,
  func,
  shape,
  array,
  oneOf,
  string,
  number,
  object,
  arrayOf,
  oneOfType
} from "prop-types"

export const propTypes = {
  onFieldChange: func.isRequired,
  onFieldDocRemove: func.isRequired,
  val: oneOfType([ string, number, object ]).isRequired,
  field: shape({
    id: string.isRequired,
    name: string.isRequired,
    short: string.isRequired,
    type: oneOf([ "text", "date", "list", "int" ]).isRequired,
    isDoc: bool.isRequired,
    db: arrayOf(object),
    init: oneOfType([ array, string, number, object ]).isRequired,
    req: bool.isRequired,
    validators: arrayOf(object).isRequired,
    min: number.isRequired,
    max: number.isRequired,
    parse: shape({
      in: func.isRequired,
      out: func.isRequired
    }).isRequired
  }).isRequired
}
