const gql = require("graphql-tag")

const typeDefs = gql`

  type Query {
    artist(id: ID!): Artist!
    album(id: ID!): Album!
    song(id: ID!): Song!
    artists: [Artist!]!
    albums: [Album!]!
    songs: [Song]!
  }

  type Artist {
    id: ID!
    name: String!
    albums: [Album!]!
    songs: [Song!]!
  }

  type Album {
    id: ID!
    title: String!
    year: Int!
    artist: Artist!
    songs: [Song!]!
  }

  type Song {
    id: ID!
    title: String!
    artist: Artist!
    album: Album!
  }
  
`

module.exports = typeDefs
