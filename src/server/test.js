import { Album, Artist, Genre, Song, User } from "./database/models/index.js"
import { serializeCollection } from "./helpers/collection.js"

const test = async () => {
  const result = await Promise.all([
    Song.find().lean().exec(),
    Album.find().lean().exec(),
    Genre.find().lean().exec(),
    Artist.find().lean().exec(),
  ])
  const library = result.map(collection => serializeCollection(collection))
  const libraryIds = library.map(collection => collection.map(({ id }) => id))
  const songs = libraryIds[0]
  const albums = libraryIds[1]
  const genres = libraryIds[2]
  const artists = libraryIds[3]
  await User.findByIdAndUpdate(
    "5dfacf7d106b6402ac9d3375",
    { songs, albums, genres, artists }
  )
}

export default test
