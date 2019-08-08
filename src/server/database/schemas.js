import mongoose from "mongoose"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

export const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256
  },
  // cover: {
  //   type: Buffer,
  //   required: true
  // }
})

export const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 2019,
    validate : {
      validator : Number.isInteger,
      message: "{VALUE} is not an integer value."
    }
  },
  // cover: {
  //   type: Buffer,
  //   required: true
  // },
  artists: [{
    type: ObjectId,
    required: true,
    minlength: 24,
    maxlength: 24,
    index: true
  }]
})

export const songSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256
  },
  trackNumber: {
    type: Number,
    required: true,
    min: 1,
    max: Infinity
  },
  // audio: {
  //   type: Buffer,
  //   required: true
  // },
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
  album: {
    type: ObjectId,
    required: true,
    minlength: 24,
    maxlength: 24,
    index: true
  }
})
