import { Artist, Album, Genre, Song, User } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeDocument } from "../../helpers/collection.js"

export default {
  addArtist: resolver(
    async ({ args }) => {
      const artist = await Artist.create(args)
      return serializeDocument(artist.toObject())
    }
  ),
  addAlbum: resolver(
    async ({ args }) => {
      args.released = args.released / 86400
      const album = await Album.create(args)
      return serializeDocument(album.toObject())
    }
  ),
  addGenre: resolver(
    async ({ args }) => {
      const genre = await Genre.create(args)
      return serializeDocument(genre.toObject())
    }
  ),
  addSong: resolver(
    async ({ args }) => {
      const song = await Song.create(args)
      return serializeDocument(song.toObject())
    }
  ),
  addUserSong: resolver(
    async ({ args }) => {
      const { userId, songId } = args
      const update = { $push: { songs: songId } }
      const mutation = User.findByIdAndUpdate(userId, update)
      const user = await mutation.lean().exec()
      return serializeDocument(user)
    }
  ),
  updateNowPlaying: resolver(
    async ({ args }) => {
      const { userId, songId } = args
      const update = { nowPlaying: songId }
      const mutation = User.findByIdAndUpdate(userId, update)
      const user = await mutation.lean().exec()
      return serializeDocument(user)
    }
  ),
}
