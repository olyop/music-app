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

  type Mutation {
    addArtist(name: String!): Artist!
    addAlbum(title: String!, year: Int!, artist: ID!): Album!
    addSong(title: String!, trackNumber: Int!, artist: ID!, album: ID!): Song!
  }

  type Artist {
    id: ID!
    createdAt: String!
    version: Int!
    name: String!
    albums: [Album!]!
    songs: [Song!]!
  }

  type Album {
    id: ID!
    createdAt: String!
    version: Int!
    title: String!
    year: Int!
    artist: Artist!
    songs: [Song!]!
  }

  type Song {
    id: ID!
    createdAt: String!
    version: Int!
    title: String!
    artist: Artist!
    album: Album!
  }
  
`

module.exports = typeDefs
