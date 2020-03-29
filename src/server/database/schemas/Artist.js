import mongoose from "mongoose"
import { SCHEMA_OPTIONS } from "../../globals.js"

const { Schema } = mongoose

const definition = {
  name: {
    type: String,
    minlength: 1,
    required: true,
    maxlength: 256,
  },
  photo: {
    type: Buffer,
    required: true,
  },
}

const schema = new Schema(definition, SCHEMA_OPTIONS)

export default schema
