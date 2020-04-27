import mongoose from "mongoose"
import { SCHEMA_CONFIG } from "../../globals/configs.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const definition = {
  user: {
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

const schema = new Schema(definition, SCHEMA_CONFIG)

export default schema
