import { shape, string, bool, number } from "prop-types"

export const propTypes = {
  genre: shape({
    name: string.isRequired,
    genreId: string.isRequired,
    inLibrary: bool.isRequired,
    numOfSongs: number.isRequired,
  }).isRequired,
}
