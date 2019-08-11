import gql from "graphql-tag"

const typeDefs = gql`

  type Query {
    artists: [Artist!]!
    labels: [Label!]!
    albums: [Album!]!
    genres: [Genre!]!
    songs: [Song]!
  }

  type Mutation {
    addArtist(name: String!): Artist!
    addLabel(name: String!): Label!
    addAlbum(title: String!, released: Int!, label: Label! artists: [ID!]!): Album!
    addSong(title: String!, trackNumber: Int!, artist: ID!, album: ID!): Song!
    addGenre(name: String!): Genre!
  }

  type Artist {
    id: ID!
    name: String!
    albums: [Album!]!
    songs: [Song!]!
  }

  type Label {
    id: ID!
    name: String!
    albums: [Album!]!
  }

  type Album {
    id: ID!
    title: String!
    released: Date!
    artists: [Artist!]!
    label: Label!
    songs: [Song!]!
  }

  type Genre {
    id: ID!
    name: String!
    songs: [Song!]!
  }

  type Song {
    id: ID!
    title: String!
    mixType: String!
    trackNumber: Int!
    discNumber: Int!
    featuring: [Artist!]!
    remixers: [Artist!]!
    artists: [Artist!]!
    album: Album!
    genres: [Genre!]!
  }
  
`

export default typeDefs
