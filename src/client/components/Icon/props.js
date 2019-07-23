import { func, string } from "prop-types"
import { noop } from "lodash"

export const propTypes = {
  icon: string.isRequired,
  bem: func.isRequired,
  className: string.isRequired,
  onClick: func
}

export const defaultProps = {
  onClick: noop
}
