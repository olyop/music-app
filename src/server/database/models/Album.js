import database from "../database.js"
import mongoose from "mongoose"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256
  },
  released: {
    type: Date,
    required: true,
    max: Date.now()
  },
  label: {
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
  remixers: [{
    type: ObjectId,
    minlength: 24,
    maxlength: 24,
    index: true
  }]
})

export default database.model("Album", schema, "albums")
