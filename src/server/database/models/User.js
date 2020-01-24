import mongoose from "mongoose"
import database from "../database.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 256,
    required: true,
  },
  nowPlaying: {
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  },
  library: {
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  },
})

export default database.model("User", schema, "users")
