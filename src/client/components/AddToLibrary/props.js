import { string, shape } from "prop-types"

export const propTypes = {
  className: string,
  doc: shape({
    id: string.isRequired,
    __typename: string.isRequired,
  }).isRequired,
}

export const defaultProps = {
  className: undefined,
}
