import s3 from "../../s3.js"
import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { deserializeDocument } from "../../helpers/collections.js"
import { S3_BUCKET_NAME as Bucket, USER_EMPTY_QUEUE } from "../../globals.js"

import {
  determineDuration,
  determineReleased,
  determineUserSelect,
  determineUserSongSelect,
  determineUserAlbumSelect,
} from "../../helpers/resolvers.js"

const {
  Play,
  Song,
  User,
  Album,
  Genre,
  Artist,
  UserSong,
  UserAlbum,
} = database.models

export default {
  addArtist: resolver(
    async ({ args: { photo, ...data } }) => {
      // create in database
      const upload = await photo
      const doc = await Artist.create(data)
      const docObj = deserializeDocument(doc.toObject())
      // upload to s3
      const ACL = "public-read"
      const Key = `catalog/${docObj.id}.jpg`
      const Body = upload.createReadStream()
      const params = { Key, ACL, Bucket, Body }
      await s3.upload(params).promise()
      return docObj
    },
  ),
  addAlbum: resolver(
    async ({ args: { cover, released, ...argsRest } }) => {
      // create in database
      const upload = await cover
      const data = { ...argsRest, released: determineReleased(released) }
      const doc = await Album.create(data)
      const docObj = deserializeDocument(doc.toObject())
      // upload to s3
      const ACL = "public-read"
      const Key = `catalog/${docObj.id}.jpg`
      const Body = upload.createReadStream()
      const params = { ACL, Key, Body, Bucket }
      await s3.upload(params).promise()
      return docObj
    },
  ),
  addGenre: resolver(
    async ({ args }) => {
      const genre = await Genre.create(args)
      return deserializeDocument(genre.toObject())
    },
  ),
  addSong: resolver(
    async ({ args: { audio, duration, ...argsRest } }) => {
      // create in database
      const upload = await audio
      const data = { ...argsRest, duration: determineDuration(duration) }
      const song = await Song.create(data)
      const docObj = deserializeDocument(song.toObject())
      // upload to s3
      const ACL = "private"
      const Key = `catalog/${docObj.id}.mp3`
      const Body = upload.createReadStream()
      const params = { ACL, Key, Body, Bucket }
      await s3.upload(params).promise()
      return docObj
    },
  ),
  addUserSong: resolver(
    async ({ info, args: { userId, songId } }) => {
      const filter = { user: userId, song: songId }
      const exists = await UserSong.exists(filter)
      if (exists) {
        const query =
          UserSong
            .findOneAndUpdate(filter, { inLibrary: true })
            .setOptions({ new: true })
            .select(determineUserSongSelect(info))
            .lean()
            .exec()
        return deserializeDocument(await query)
      } else {
        const data = { ...filter, inLibrary: true }
        const mutation = UserSong.create(data)
        const doc = await mutation
        return deserializeDocument(doc.toObject())
      }
    },
  ),
  addUserAlbum: resolver(
    async ({ info, args: { userId, albumId } }) => {
      const filter = { user: userId, album: albumId }
      const exists = await UserAlbum.exists(filter)
      if (exists) {
        const query =
          UserAlbum
            .findOneAndUpdate(filter, { inLibrary: true })
            .setOptions({ new: true })
            .select(determineUserAlbumSelect(info))
            .lean()
            .exec()
        return deserializeDocument(await query)
      } else {
        const data = { ...filter, inLibrary: true }
        const mutation = UserAlbum.create(data)
        const doc = await mutation
        return deserializeDocument(doc.toObject())
      }
    },
  ),
  removeUserSong: resolver(
    async ({ info, args: { userId, songId } }) => {
      const query =
        UserSong
          .findOneAndUpdate(
            { user: userId, song: songId },
            { inLibrary: false },
            { new: true },
          )
          .select(determineUserSongSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  removeUserAlbum: resolver(
    async ({ info, args: { userId, albumId } }) => {
      const query =
        UserAlbum
          .findOneAndUpdate(
            { user: userId, album: albumId },
            { inLibrary: false },
            { new: true },
          )
          .select(determineUserAlbumSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  userPlay: resolver(
    async ({ info, args: { userId, songId } }) => {
      await Play.create({ user: userId, song: songId })
      const query =
        User
          .findByIdAndUpdate(userId, {
            ...USER_EMPTY_QUEUE,
            nowPlaying: songId,
          })
          .setOptions({ new: true })
          .select(determineUserSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    }
  ),
  userPrev: resolver(
    async ({ info, args: { userId } }) => {
      const user = deserializeDocument(
        await User
          .findById(userId)
          .lean()
          .exec()
      )

      return deserializeDocument(
        await User
          .findByIdAndUpdate(userId, {})
          .setOptions({ new: true })
          .select(determineUserSelect(info))
          .lean()
          .exec()
      )
    }
  )
}
