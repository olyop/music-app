import { string, shape, bool } from "prop-types"

export const propTypes = {
  doc: shape({
    inLibrary: bool,
    __typename: string.isRequired,
  }).isRequired,
}
