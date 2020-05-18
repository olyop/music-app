import {
  rmUserSong,
  rmUserAlbum,
  rmUserGenre,
  rmUserArtist,
  addUserSong,
  addUserAlbum,
  addUserGenre,
  addUserArtist,
} from "./addRemoveUserDoc.js"

import addUser from "./addUser.js"
import addSong from "./addSong.js"
import addGenre from "./addGenre.js"
import addAlbum from "./addAlbum.js"
import addArtist from "./addArtist.js"

import userPlay from "./userPlay.js"
import userPrev from "./userPrev.js"
import userNext from "./userNext.js"

import userAddSongNext from "./userAddSongNext.js"
import userAddSongLater from "./userAddSongLater.js"
import userAddSongQueue from "./userAddSongQueue.js"

import mapResolver from "../../../helpers/utils/mapResolver.js"

const mutationResolver =
  mapResolver({
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
