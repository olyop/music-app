import database from "../database.js"
import mongoose from "mongoose"

const { Schema } = mongoose

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256
  }
})

export default database.model("Genre", schema, "genres")
