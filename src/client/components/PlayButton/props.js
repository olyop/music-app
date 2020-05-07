import { string, object } from "prop-types"

export const propTypes = {
  className: string,
  doc: object.isRequired,
}

export const defaultProps = {
  className: null,
}
