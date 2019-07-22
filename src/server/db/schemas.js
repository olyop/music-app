const { Schema } = require("mongoose")

const { ObjectId } = Schema.Types

const userSchema = new Schema({
  name: String
})

const postSchema = new Schema({
  title: String,
  body: String,
  userKey: ObjectId
})

const commentSchema = new Schema({
  text: String,
  userKey: ObjectId,
  postKey: ObjectId
})

Object.assign(exports, {
  userSchema,
  postSchema,
  commentSchema
})
