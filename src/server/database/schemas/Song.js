import mongoose from "mongoose"
import { SCHEMA_OPTIONS } from "../../globals.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const definition = {
  mix: {
    type: String,
    minlength: 0,
    maxlength: 256,
  },
  featuring: [{
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  }],
  remixers: [{
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
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
    minlength: 1,
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
}

const schema = new Schema(definition, SCHEMA_OPTIONS)

export default schema
