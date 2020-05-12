import { string, shape, number, bool } from "prop-types"

export const propTypes = {
  className: string,
  artist: shape({
    inLibrary: bool,
    numOfSongs: number,
    numOfAlbums: number,
    name: string.isRequired,
    photo: string.isRequired,
    artistId: string.isRequired,
  }).isRequired,
}

export const defaultProps = {
  className: null,
}
