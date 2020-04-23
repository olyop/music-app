import {
  isSong,
  resolver,
  isResEmpty,
  doIdsExist,
  parseSqlRow,
  doesIdExist,
  awsCatalogKey,
  queryDatabase,
  uploadFileToS3,
  uploadFileFromClient,
} from "../../../helpers/index.js"

import {
  INSERT_SONG,
  INSERT_SONG_FEAT,
  INSERT_SONG_GENRE,
  INSERT_SONG_ARTIST,
  INSERT_SONG_REMIXER,
  SELECT_IS_SONG_UNIQUE,
} from "../../../sql/index.js"

import ApolloServerExpress from "apollo-server-express"

import uuid from "uuid"
import every from "lodash/every.js"
import mp3Duration from "mp3-duration"

const { UserInputError } = ApolloServerExpress

const addSong = async ({ args }) => {

  const audio = await uploadFileFromClient(args.audio)

  if (!isSong({ ...args, audio })) {
    throw new UserInputError("Invalid arguments.")
  }

  const {
    mix,
    title,
    albumId,
    genreIds,
    artistIds,
    remixerIds,
    discNumber,
    trackNumber,
    featuringIds,
  } = args

  const isUniqueAlbumSong =
    queryDatabase({
      query: SELECT_IS_SONG_UNIQUE,
      parse: isResEmpty,
      variables: {
        title,
        albumId,
        discNumber,
        trackNumber,
      },
    })

  const doGenresExist = doIdsExist(genreIds, "genre_id", "genres")
  const doesAlbumExist = doesIdExist(albumId, "album_id", "albums")
  const doArtistsExist = doIdsExist(artistIds, "artist_id", "artists")
  const doRemixersExist = doIdsExist(remixerIds, "artist_id", "artists")
  const doFeaturingExist = doIdsExist(featuringIds, "artist_id", "artists")

  const databaseChecks = Promise.all([
    doGenresExist,
    doesAlbumExist,
    doArtistsExist,
    doRemixersExist,
    doFeaturingExist,
    isUniqueAlbumSong,
  ])

  if (!every(await databaseChecks)) {
    throw new UserInputError("Database checks failed.")
  }

  const songId = uuid.v4()
  const duration = Math.ceil(await mp3Duration(audio))

  console.log({
    mix,
    title,
    songId,
    albumId,
    genreIds,
    duration,
    artistIds,
    remixerIds,
    discNumber,
    trackNumber,
    featuringIds,
  })

  const songInsert =
    queryDatabase({
      query: INSERT_SONG,
      parse: parseSqlRow,
      variables: {
        mix,
        title,
        songId,
        albumId,
        duration,
        discNumber,
        trackNumber,
      },
    })

  const songGenresInserts =
    genreIds.map(
      (genreId, genreIndex) => (
        queryDatabase({
          query: INSERT_SONG_GENRE,
          variables: {
            songId,
            genreId,
            genreIndex,
            songGenreId: uuid.v4(),
          },
        })
      ),
    )

  const songArtistsInserts =
    artistIds.map(
      (artistId, artistIndex) => (
        queryDatabase({
          query: INSERT_SONG_ARTIST,
          variables: {
            songId,
            artistId,
            artistIndex,
            songArtistId: uuid.v4(),
          },
        })
      ),
    )

  const songRemixersInserts =
    remixerIds.map(
      (artistId, artistIndex) => (
        queryDatabase({
          query: INSERT_SONG_REMIXER,
          variables: {
            songId,
            artistId,
            artistIndex,
            songRemixerId: uuid.v4(),
          },
        })
      ),
    )

  const songFeaturingInserts =
    featuringIds.map(
      (artistId, artistIndex) => (
        queryDatabase({
          query: INSERT_SONG_FEAT,
          variables: {
            songId,
            artistId,
            artistIndex,
            songFeaturingId: uuid.v4(),
          },
        })
      ),
    )

  const audioUpload =
    uploadFileToS3({ key: awsCatalogKey(songId), file: audio })

  const song = await songInsert

  await Promise.all([
    audioUpload,
    ...songGenresInserts,
    ...songArtistsInserts,
    ...songRemixersInserts,
    ...songFeaturingInserts,
  ])

  return song
}

export default resolver(addSong)
