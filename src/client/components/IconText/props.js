import { string } from "prop-types"

export const propTypes = {
  className: string,
  iconClassName: string,
  icon: string.isRequired,
  text: string.isRequired
}

export const defaultProps = {
  className: undefined,
  iconClassName: undefined
}
