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
  oneOfType,
} from "prop-types"

export const propTypes = {
  onFieldChange: func.isRequired,
  onFieldDocRemove: func.isRequired,
  val: oneOfType([ string, number, object ]).isRequired,
  field: shape({
    db: arrayOf(object),
    req: bool.isRequired,
    id: string.isRequired,
    min: number.isRequired,
    max: number.isRequired,
    isDoc: bool.isRequired,
    parse: shape({
      in: func.isRequired,
      out: func.isRequired,
    }).isRequired,
    name: string.isRequired,
    short: string.isRequired,
    validators: arrayOf(object).isRequired,
    type: oneOf([ "text", "date", "list", "int" ]).isRequired,
    init: oneOfType([ array, string, number, object ]).isRequired,
  }).isRequired,
}
