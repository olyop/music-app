import { string, node, arrayOf } from "prop-types"

export const propTypes = {
  className: string,
  children: node.isRequired,
  columnsToIgnore: arrayOf(string),
}

export const defaultProps = {
  columnsToIgnore: [],
  className: undefined,
}
