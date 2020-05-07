import { shape, string, number, arrayOf, object, bool } from "prop-types"

export const propTypes = {
  showCover: bool,
  className: string,
  infoClassName: string,
  song: shape({
    mix: string.isRequired,
    title: string.isRequired,
    songId: string.isRequired,
    inLibrary: bool.isRequired,
    duration: number.isRequired,
    featuring: arrayOf(object).isRequired,
    remixers: arrayOf(object).isRequired,
    artists: arrayOf(object).isRequired,
    album: shape({
      cover: string,
      title: string.isRequired,
      albumId: string.isRequired,
    }).isRequired,
  }).isRequired,
}

export const defaultProps = {
  showCover: true,
  className: null,
  infoClassName: null,
}
