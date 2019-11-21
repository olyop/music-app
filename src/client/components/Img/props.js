import { string, node } from "prop-types"

export const propTypes = {
  children: node,
  className: string,
  imgClassName: string,
  url: string.isRequired,
}

export const defaultProps = {
  children: null,
  className: undefined,
  imgClassName: undefined,
}
