import { string } from "prop-types"

export const propTypes = {
  title: string.isRequired,
  albumKey: string.isRequired,
  albumName: string.isRequired,
  artistName: string.isRequired
}
