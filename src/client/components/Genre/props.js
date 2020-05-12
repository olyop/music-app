import { shape, string, bool, number } from "prop-types"

export const propTypes = {
  genre: shape({
    inLibrary: bool,
    numOfSongs: number,
    name: string.isRequired,
    genreId: string.isRequired,
  }).isRequired,
}
