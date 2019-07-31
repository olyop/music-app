const db = require("./connection")

const { artist, album, song } = require("./schemas")
const { assign } = require("lodash")

const Artist = db.model("Artist", artist, "artists")
const Album = db.model("Album", album, "albums")
const Song = db.model("Song", song, "songs")

assign(exports, { Artist, Album, Song })
