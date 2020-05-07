import { noop } from "lodash"
import { func, string } from "prop-types"

export const propTypes = {
  onClick: func,
  className: string,
  iconClassName: string,
  textClassName: string,
  icon: string.isRequired,
  text: string.isRequired,
}

export const defaultProps = {
  onClick: noop,
  className: null,
  iconClassName: null,
  textClassName: null,
}
