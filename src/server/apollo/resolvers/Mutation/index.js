import addUser from "./addUser.js"
import addSong from "./addSong.js"
import addGenre from "./addGenre.js"
import addAlbum from "./addAlbum.js"
import addArtist from "./addArtist.js"

import userPlay from "./userPlay.js"
import userPrev from "./userPrev.js"
import userNext from "./userNext.js"

import rmUserSong from "./rmUserSong.js"
import rmUserAlbum from "./rmUserAlbum.js"
import rmUserGenre from "./rmUserGenre.js"
import rmUserArtist from "./rmUserArtist.js"

import addUserSong from "./addUserSong.js"
import addUserAlbum from "./addUserAlbum.js"
import addUserGenre from "./addUserGenre.js"
import addUserArtist from "./addUserArtist.js"

import userAddSongNext from "./userAddSongNext.js"
import userAddSongLater from "./userAddSongLater.js"
import userAddSongQueue from "./userAddSongQueue.js"

import mapResolver from "../../../helpers/utilities/mapResolver.js"

const mutationResolver = mapResolver({
  addUser,
  addSong,
  userPlay,
  userPrev,
  userNext,
  addGenre,
  addAlbum,
  addArtist,
  rmUserSong,
  rmUserAlbum,
  rmUserGenre,
  rmUserArtist,
  addUserSong,
  addUserAlbum,
  addUserGenre,
  addUserArtist,
  userAddSongNext,
  userAddSongLater,
  userAddSongQueue,
})

export default mutationResolver
