const { model } = require("mongoose")

const {
  userSchema,
  postSchema,
  commentSchema
} = require('./schemas')

const User = model("User", userSchema, "users")
const Post = model("Post", postSchema, "posts")
const Comment = model("Comment", commentSchema, "comments")

Object.assign(exports, {
  User,
  Post,
  Comment
})
