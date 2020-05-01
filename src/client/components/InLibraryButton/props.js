import { string, shape, bool } from "prop-types"

export const propTypes = {
  className: string,
  doc: shape({
    inLibrary: bool.isRequired,
    __typename: string.isRequired,
  }).isRequired,
}

export const defaultProps = {
  className: undefined,
}
