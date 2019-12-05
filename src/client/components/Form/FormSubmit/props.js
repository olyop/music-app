import { string, bool } from "prop-types"

export const propTypes = {
  text: string.isRequired,
  isFormValid: bool.isRequired,
}
