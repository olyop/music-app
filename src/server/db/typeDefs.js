const gql = require("graphql-tag")

const typeDefs = gql`

  type Query {
    users: [User!]!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type User {
    key: ID!
    createdAt: String!
    name: String!
  }

  type Post {
    key: ID!
    createdAt: String!
    title: String!
    body: String!
    userKey: ID!
  }

  type Comment {
    key: ID!
    createdAt: String!
    text: String!
    userKey: ID!
    postKey: ID!
  }
  
`

module.exports = typeDefs
