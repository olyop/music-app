import { string, func, shape } from "prop-types"

export const propTypes = {
  doc: shape({
    name: string,
    title: string,
  }).isRequired,
  onFieldDocRemove: func.isRequired,
}

export const defaultProps = {
  doc: {
    name: null,
    title: null,
  },
}
