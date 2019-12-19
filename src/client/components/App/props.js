import { shape, string, arrayOf, object, number } from "prop-types"

export const propTypes = {
  user: shape({
    id: string.isRequired,
    songs: arrayOf(object),
    genres: arrayOf(object),
    albums: arrayOf(object),
    name: string.isRequired,
    artists: arrayOf(object),
    nowPlaying: shape({
      id: string.isRequired,
      mix: string.isRequired,
      title: string.isRequired,
      album: shape({
        id: string.isRequired,
        title: string.isRequired,
      }).isRequired,
      duration: number.isRequired,
      genres: arrayOf(object).isRequired,
      artists: arrayOf(object).isRequired,
      remixers: arrayOf(object).isRequired,
      featuring: arrayOf(object).isRequired,
    }).isRequired,
  }).isRequired,
}
