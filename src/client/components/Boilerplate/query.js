import gql from "graphql-tag"

const query = gql`{
  users {
    key
    createdAt
    name
  }
  posts {
    key
    createdAt
    title
    body
    userKey
  }
  comments {
    key
    createdAt
    text
    userKey
    postKey
  }
}`

export default query
