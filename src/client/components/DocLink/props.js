import { string, shape } from "prop-types"

export const propTypes = {
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
