import { string, shape } from "prop-types"

export const propTypes = {
  className: string,
  doc: shape({ songId: string.isRequired }).isRequired,
}

export const defaultProps = {
  className: null,
}
