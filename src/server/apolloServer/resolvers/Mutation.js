import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { serializeDocument } from "../../helpers/collection.js"

const { Song, User, Album, Genre, Artist, UserSong, UserAlbum } = database.models

export default {
  addArtist: resolver(
    async ({ args }) => {
      const artist = await Artist.create(args)
      return serializeDocument(artist.toObject())
    }
  ),
  addAlbum: resolver(
    async ({ args }) => {
      const newArgs = { ...args, released: args.released / 86400 }
      const album = await Album.create(newArgs)
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
      const filter = { user: userId, song: songId }
      const exists = await UserSong.exists(filter)
      if (exists) {
        const update = { inLibrary: true }
        const query = UserSong.findOneAndUpdate(filter, update)
        const doc = await query.lean().exec()
        return serializeDocument(doc)
      } else {
        const update = { ...filter, inLibrary: true }
        const mutation = UserSong.create(update)
        const doc = await mutation
        return serializeDocument(doc.toObject())
      }
    }
  ),
  addUserAlbum: resolver(
    async ({ args }) => {
      const { userId, albumId } = args
      const filter = { user: userId, album: albumId }
      const exists = await UserAlbum.exists(filter)
      if (exists) {
        const update = { inLibrary: true }
        const query = UserAlbum.findOneAndUpdate(filter, update)
        const doc = await query.lean().exec()
        return serializeDocument(doc)
      } else {
        const update = { ...filter, inLibrary: true }
        const mutation = UserAlbum.create(update)
        const doc = await mutation
        return serializeDocument(doc.toObject())
      }
    }
  ),
  removeUserSong: resolver(
    async ({ args }) => {
      const { userId, songId } = args
      const filter = { user: userId, song: songId }
      const exists = await UserSong.exists(filter)
      if (exists) {
        const update = { inLibrary: false }
        const query = UserSong.findOneAndUpdate(filter, update)
        const doc = await query.lean().exec()
        return serializeDocument(doc)
      } else {
        const update = { ...filter, inLibrary: false }
        const mutation = UserSong.create(update)
        const doc = await mutation
        return serializeDocument(doc.toObject())
      }
    }
  ),
  removeUserAlbum: resolver(
    async ({ args }) => {
      const { userId, songId } = args
      const filter = { user: userId, song: songId }
      const exists = await UserSong.exists(filter)
      if (exists) {
        const update = { inLibrary: false }
        const query = UserAlbum.findOneAndUpdate(filter, update)
        const doc = await query.lean().exec()
        return serializeDocument(doc)
      } else {
        const update = { ...filter, inLibrary: false }
        const mutation = UserAlbum.create(update)
        const doc = await mutation
        return serializeDocument(doc.toObject())
      }
    }
  ),
  updateNowPlaying: resolver(
    async ({ args }) => {
      const { userId, songId } = args
      const update = { nowPlaying: songId }
      const mutation = User.findByIdAndUpdate(userId, update)
      const doc = await mutation.lean().exec()
      return serializeDocument(doc)
    }
  ),
}
