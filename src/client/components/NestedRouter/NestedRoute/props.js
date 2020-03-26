import { string, node, shape } from "prop-types"

export const propTypes = {
  path: string,
  route: shape({
    path: string.isRequired,
    component: node.isRequired,
  }),
}

export const defaultProps = {
  path: "",
}
