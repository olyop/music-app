import { noop } from "lodash"
import { func, string } from "prop-types"

export const propTypes = {
  title: string,
  onClick: func,
  className: string,
  icon: string.isRequired,
}

export const defaultProps = {
  onClick: noop,
  title: undefined,
  className: undefined,
}
