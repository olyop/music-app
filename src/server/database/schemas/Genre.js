import mongoose from "mongoose"
import { SCHEMA_CONFIG } from "../../globals/configs.js"

const { Schema } = mongoose

const definition = {
  name: {
    type: String,
    minlength: 1,
    required: true,
    maxlength: 256,
  },
}

const schema = new Schema(definition, SCHEMA_CONFIG)

export default schema
