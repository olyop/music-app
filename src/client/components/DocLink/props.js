import { string, shape } from "prop-types"

export const propTypes = {
  path: string.isRequired,
  doc: shape({
    name: string,
    title: string,
  }).isRequired,
}

export const defaultProps = {
  doc: {
    name: null,
    title: null,
  },
}
