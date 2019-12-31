import database from "../database.js"
import mongoose from "mongoose"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  mix: {
    type: String,
    maxlength: 256,
  },
  featuring: [{
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
  }],
  remixers: [{
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
  }],
  artists: [{
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  }],
  genres: [{
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  }],
  album: {
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 2048,
  },
  trackNumber: {
    min: 1,
    max: 99,
    type: Number,
    required: true,
    validate: Number.isInteger,
  },
  discNumber: {
    min: 1,
    max: 99,
    type: Number,
    required: true,
    validate: Number.isInteger,
  },
  duration: {
    min: 1,
    type: Number,
    max: Infinity,
    required: true,
    validate: Number.isInteger,
  },
})

export default database.model("Song", schema, "songs")
