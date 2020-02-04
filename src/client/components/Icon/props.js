import { noop } from "lodash"
import { func, string } from "prop-types"

export const propTypes = {
  onClick: func,
  className: string,
  icon: string.isRequired,
}

export const defaultProps = {
  onClick: noop,
  className: undefined,
}
