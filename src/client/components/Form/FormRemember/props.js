import { string, bool, func } from "prop-types"

export const propTypes = {
  text: string.isRequired,
  remember: bool.isRequired,
  onToggleRemember: func.isRequired,
}
