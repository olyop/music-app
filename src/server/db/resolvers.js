const { serializeCollection, sortCollection } = require("../helpers/collection")
const { pipe } = require("../helpers/misc")

const { User, Post, Comment } = require("./models")

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({}).exec()
      return pipe(users)(
        serializeCollection,
        sortCollection("name")
      )
    },
    posts: async () => {
      const posts = await Post.find({}).exec()
      return pipe(posts)(
        serializeCollection,
        sortCollection("title")
      )
    },
    comments: async () => {
      const comments = await Comment.find({}).exec()
      return pipe(comments)(
        serializeCollection,
        sortCollection("text")
      )
    }
  }
}

module.exports = resolvers
