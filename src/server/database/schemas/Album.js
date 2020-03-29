import mongoose from "mongoose"
import { SCHEMA_OPTIONS } from "../../globals.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const definition = {
  title: {
    type: String,
    minlength: 1,
    required: true,
    maxlength: 256,
  },
  cover: {
    type: Buffer,
    required: true,
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
}

const schema = new Schema(definition, SCHEMA_OPTIONS)

export default schema
