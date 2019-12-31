import database from "../database.js"
import mongoose from "mongoose"

const { Schema } = mongoose

const schema = new Schema({
  name: {
    type: String,
    minlength: 1,
    required: true,
    maxlength: 256,
  },
})

export default database.model("Artist", schema, "artists")
