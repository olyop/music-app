const database = require("./connection")

const { artist, album, song } = require("./schemas")
const { assign } = require("lodash")

const Artist = database.model("Artist", artist, "artists")
const Album = database.model("Album", album, "albums")
const Song = database.model("Song", song, "songs")

assign(exports, { Artist, Album, Song })
