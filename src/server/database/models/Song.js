import database from "../database.js"
import mongoose from "mongoose"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 256
  },
  mix: {
    type: String,
    maxlength: 256
  },
  trackNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
    validate: Number.isInteger
  },
  discNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
    validate: Number.isInteger
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: Infinity,
    validate: Number.isInteger
  },
  featuring: [{
    type: ObjectId,
    minlength: 24,
    maxlength: 24,
    index: true
  }],
  remixers: [{
    type: ObjectId,
    minlength: 24,
    maxlength: 24,
    index: true
  }],
  artists: [{
    type: ObjectId,
    required: true,
    minlength: 24,
    maxlength: 24,
    index: true
  }],
  genres: [{
    type: ObjectId,
    required: true,
    minlength: 24,
    maxlength: 24,
    index: true
  }],
  album: {
    type: ObjectId,
    required: true,
    minlength: 24,
    maxlength: 24,
    index: true
  }
})

export default database.model("Song", schema, "songs")
