import mongoose from "mongoose"
import database from "../database.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  title: {
    type: String,
    minlength: 1,
    required: true,
    maxlength: 256,
  },
  artists: [{
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  }],
  released: {
    min: 1,
    type: Number,
    max: Infinity,
    required: true,
    validate: Number.isInteger,
  },
})

export default database.model("Album", schema, "albums")
