import s3 from "../../s3.js"
import database from "../../database/index.js"
import { resolver, determineS3Key } from "../../helpers/misc.js"
import { S3_BUCKET_NAME as Bucket, S3_ACL as ACL } from "../../globals.js"

import {
  determineDuration,
  determineReleased,
  deserializeDocument,
  determineUserSelect,
  determineUserSongSelect,
} from "../../helpers/resolvers.js"

const { Song, User, Album, Genre, Artist, UserSong } = database.models

export default {
  addArtist: resolver(
    async ({ args: { photo, ...data } }) => {
      const upload = await photo
      const stream = upload.createReadStream()
      let chunks = []
      for await (const chunk of stream) chunks.push(chunk)
      const Body = Buffer.concat(chunks)
      const doc = await Artist.create({ ...data, photo: Body })
      const docObj = deserializeDocument(doc.toObject())
      const Key = determineS3Key(docObj.id)
      const params = { Key, ACL, Bucket, Body }
      await s3.upload(params).promise()
      return docObj
    }
  ),
  addAlbum: resolver(
    async ({ args: { cover, released, ...argsRest } }) => {
      const data = { ...argsRest, released: determineReleased(released) }
      const upload = await cover
      const stream = upload.createReadStream()
      let chunks = []
      for await (const chunk of stream) chunks.push(chunk)
      const Body = Buffer.concat(chunks)
      const doc = await Album.create({ ...data, cover: Body })
      const docObj = deserializeDocument(doc.toObject())
      const Key = determineS3Key(docObj.id)
      const params = { Key, ACL, Bucket, Body }
      await s3.upload(params).promise()
      return docObj
    }
  ),
  addGenre: resolver(
    async ({ args }) => {
      const genre = await Genre.create(args)
      return deserializeDocument(genre.toObject())
    }
  ),
  addSong: resolver(
    async ({ args: { duration, ...data } }) => {
      const newArgs = { ...data, duration: determineDuration(duration) }
      const song = await Song.create(newArgs)
      return deserializeDocument(song.toObject())
    }
  ),
  addUserSong: resolver(
    async ({ info, args: { userId, songId } }) => {
      const filter = { user: userId, song: songId }
      const exists = await UserSong.exists(filter)
      if (exists) {
        const update = { ...filter, inLibrary: true }
        const query = UserSong.findOneAndUpdate(filter, update)
        const select = determineUserSongSelect(info)
        const doc = await query.select(select).lean().exec()
        return deserializeDocument(doc)
      } else {
        const data = { ...filter, inLibrary: true }
        const mutation = UserSong.create(data)
        const doc = await mutation
        return deserializeDocument(doc.toObject())
      }
    }
  ),
  removeUserSong: resolver(
    async ({ info, args: { userId, songId } }) => {
      const filter = { user: userId, song: songId }
      const exists = await UserSong.exists(filter)
      if (exists) {
        const update = { ...filter, inLibrary: false }
        const query = UserSong.findOneAndUpdate(filter, update)
        const select = determineUserSongSelect(info)
        const doc = await query.select(select).lean().exec()
        return deserializeDocument(doc)
      } else {
        const update = { ...filter, inLibrary: false }
        const mutation = UserSong.create(update)
        const doc = await mutation
        return deserializeDocument(doc.toObject())
      }
    }
  ),
  updateNowPlaying: resolver(
    async ({ info, args: { userId, songId } }) => {
      const update = { nowPlaying: songId }
      const query = User.findByIdAndUpdate(userId, update)
      const select = determineUserSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
}
