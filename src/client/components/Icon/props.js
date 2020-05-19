import { noop } from "lodash"
import { func, string, object } from "prop-types"

export const propTypes = {
  title: string,
  onClick: func,
  style: object,
  className: string,
  icon: string.isRequired,
}

export const defaultProps = {
  style: null,
  title: null,
  onClick: noop,
  className: null,
}
