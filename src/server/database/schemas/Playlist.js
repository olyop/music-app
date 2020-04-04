import mongoose from "mongoose"
import { SCHEMA_OPTIONS } from "../../globals.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const definition = {
  name: {
    type: String,
    minlength: 1,
    required: true,
    maxlength: 256,
  },
  user: {
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  },
}

const schema = new Schema(definition, SCHEMA_OPTIONS)

export default schema
