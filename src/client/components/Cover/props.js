import { string } from "prop-types"

export const propTypes = {
  className: string,
  imgClassName: string,
  url: string.isRequired,
}

export const defaultProps = {
  className: undefined,
  imgClassName: undefined,
}
