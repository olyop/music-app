import mongoose from "mongoose"
import { SCHEMA_OPTIONS } from "../../globals.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const definition = {
  inPlaylist: {
    type: Boolean,
    required: true,
  },
  playlist: {
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  },
  song: {
    index: true,
    minlength: 24,
    maxlength: 24,
    type: ObjectId,
    required: true,
  },
}

const schema = new Schema(definition, SCHEMA_OPTIONS)

export default schema
