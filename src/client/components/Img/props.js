import { node, string } from "prop-types"

export const propTypes = {
  url: string,
  children: node,
  className: string,
  imgClassName: string,
}

export const defaultProps = {
  url: "",
  children: null,
  className: undefined,
  imgClassName: undefined,
}
