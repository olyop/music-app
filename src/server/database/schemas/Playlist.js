import mongoose from "mongoose"
import { SCHEMA_CONFIG } from "../../globals/configs.js"

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

const schema = new Schema(definition, SCHEMA_CONFIG)

export default schema
