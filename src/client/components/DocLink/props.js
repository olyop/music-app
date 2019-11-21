import { string, shape } from "prop-types"

export const propTypes = {
  path: string.isRequired,
  doc: shape({
    name: string,
    title: string,
    id: string.isRequired,
  }).isRequired,
}

export const defaultProps = {
  doc: {
    name: undefined,
    title: undefined,
  },
}
