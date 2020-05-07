import { string, shape, number } from "prop-types"

export const propTypes = {
  artist: shape({
    artistId: string.isRequired,
    name: string.isRequired,
    photo: string.isRequired,
    numOfSongs: number.isRequired,
    numOfAlbums: number.isRequired,
  }).isRequired,
}
