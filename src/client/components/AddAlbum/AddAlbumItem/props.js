import { string, oneOf } from "prop-types"

export const propTypes = {
  query: string.isRequired,
  docType: oneOf(["artist", "genre"]),
}
