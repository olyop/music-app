import docSearch from "./docSearch.js"

const songSearch =
  async ({ args }) =>
    docSearch("songs", "song", "title")(args.query)

const albumSearch =
  async ({ args }) =>
    docSearch("albums", "album", "title")(args.query)

const genreSearch =
  async ({ args }) =>
    docSearch("genres", "genre", "name")(args.query)

const artistSearch =
  async ({ args }) =>
    docSearch("artists", "artist", "name")(args.query)

const genreSearchExact =
  async ({ args }) =>
    docSearch("genres", "genre", "name", true)(args.query)

const artistSearchExact =
  async ({ args }) =>
    docSearch("artists", "artist", "name", true)(args.query)

export default {
  songSearch,
  albumSearch,
  genreSearch,
  artistSearch,
  genreSearchExact,
  artistSearchExact,
}
