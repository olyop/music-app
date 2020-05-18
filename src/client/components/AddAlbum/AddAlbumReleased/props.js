import { string, func } from "prop-types"

export const propTypes = {
  album: string.isRequired,
  artist: string.isRequired,
  children: func.isRequired,
}
