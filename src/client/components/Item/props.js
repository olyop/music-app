import { string, node } from "prop-types"

export const propTypes = {
  text: node.isRequired,
  url: string.isRequired,
}
