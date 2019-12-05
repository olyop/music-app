import gql from "graphql-tag"

const typeDefs = gql`

  type Mutation {
    addArtist(
      name: String!,
    ): Artist!
    addAlbum(
      title: String!,
      released: Int!,
      artists: [ID!]!,
    ): Album!
    addSong(
      album: ID!,
      mix: String!,
      genres: [ID!]!,
      title: String!,
      duration: Int!,
      artists: [ID!]!,
      discNumber: Int!,
      remixers: [ID!]!,
      trackNumber: Int!,
      featuring: [ID!]!,
    ): Song!
    addGenre(
      name: String!,
    ): Genre!
  }

  type Query {
    artist(id: ID!): Artist!
    album(id: ID!): Album!
    genre(id: ID!): Genre!
    song(id: ID!): Song!
    artists: [Artist!]!
    albums: [Album!]!
    genres: [Genre!]!
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
    released: Int!
    artists: [Artist!]!
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
    mix: String!
    trackNumber: Int!
    discNumber: Int!
    duration: Int!
    featuring: [Artist!]!
    remixers: [Artist!]!
    artists: [Artist!]!
    genres: [Genre!]!
    album: Album!
  }
  
`

export default typeDefs
