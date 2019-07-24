const { Catalog } = require("./databases")
const { Schema } = require("mongoose")

const { assign } = require("lodash")

const artistSchema = new Schema({
  name: { type: String, required: true }
})

const albumSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  cover: { type: Buffer }
})

const songSchema = new Schema({
  title: { type: String, required: true },
})

const Artist = Catalog.model("Artist", artistSchema, "artists")
const Album = Catalog.model("Album", albumSchema, "albums")
const Song = Catalog.model("Song", songSchema, "songs")

assign(exports, { Artist, Album, Song })
