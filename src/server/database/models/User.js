import database from "../database.js"
import mongoose from "mongoose"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256
  },
  nowPlaying: {
    type: ObjectId,
    required: true,
    minlength: 24,
    maxlength: 24,
    index: true
  },
  artists: [{
    type: ObjectId,
    required: true,
    minlength: 24,
    maxlength: 24,
    index: true
  }],
  albums: [{
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
  songs: [{
    type: ObjectId,
    required: true,
    minlength: 24,
    maxlength: 24,
    index: true
  }]
})

export default database.model("User", schema, "users")
