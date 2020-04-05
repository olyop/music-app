import { string, shape, bool } from "prop-types"

export const propTypes = {
  className: string,
  doc: shape({
    id: string.isRequired,
    inLibrary: bool.isRequired,
    __typename: string.isRequired,
  }).isRequired,
}

export const defaultProps = {
  className: undefined,
}
