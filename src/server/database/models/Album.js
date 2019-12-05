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
    type: Number,
    required: true,
    min: 1,
    max: Infinity,
    validate: Number.isInteger
  },
  artists: [{
    type: ObjectId,
    required: true,
    minlength: 24,
    maxlength: 24,
    index: true
  }]
})

export default database.model("Album", schema, "albums")
