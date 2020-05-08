import { string, node, bool } from "prop-types"

export const propTypes = {
  children: node,
  landscape: bool,
  className: string,
  imgClassName: string,
  url: string.isRequired,
}

export const defaultProps = {
  children: null,
  className: null,
  landscape: false,
  imgClassName: null,
}
