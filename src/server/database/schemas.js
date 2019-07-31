const mongoose = require("mongoose")
const { Schema } = mongoose

const { validateYear } = require("./validaters")
const { assign } = require("lodash")
const { ObjectId } = Schema.Types

const artist = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256
  }
})

const album = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256
  },
  year: {
    type: Number,
    required: true,
    validate: validateYear
  },
  artist: {
    type: ObjectId,
    required: true,
    index: true
  }
})

const song = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256
  },
  trackNumber: {
    type: Number,
    required: true,
    min: 1
  },
  artist: {
    type: ObjectId,
    required: true,
    index: true,
  },
  album: {
    type: ObjectId,
    required: true,
    index: true
  }
})

assign(exports, { artist, album, song })
