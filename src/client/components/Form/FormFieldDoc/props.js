import { string, func } from "prop-types"

export const propTypes = {
  photoUrl: string,
  name: string.isRequired,
  onFieldDocRemove: func.isRequired,
}

export const defaultProps = {
  photoUrl: "",
}
