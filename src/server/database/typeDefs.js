import gql from "graphql-tag"

const typeDefs = gql`

  type Mutation {
    addArtist(
      name: String!
    ): Artist!
    addUser(
      name: String!
      songs: [ID!]!
      albums: [ID!]!
    ): User!
    addGenre(
      name: String!
    ): Genre!
    updateNowPlaying(
      userId: ID!
      songId: ID!
    ): Song!
    addAlbum(
      title: String!
      released: Int!
      artists: [ID!]!
    ): Album!
    addSong(
      album: ID!
      mix: String!
      genres: [ID!]!
      title: String!
      duration: Int!
      artists: [ID!]!
      discNumber: Int!
      remixers: [ID!]!
      trackNumber: Int!
      featuring: [ID!]!
    ): Song!
  }

  type Query {
    songs: [Song!]!
    users: [User!]!
    albums: [Album!]!
    genres: [Genre!]!
    artists: [Artist!]!
    song(id: ID!): Song!
    user(id: ID!): User!
    album(id: ID!): Album!
    genre(id: ID!): Genre!
    artist(id: ID!): Artist!
  }

  type Artist {
    id: ID!
    name: String!
    songs: [Song!]!
    albums: [Album!]!
  }

  type Album {
    id: ID!
    title: String!
    released: Int!
    songs: [Song!]!
    artists: [Artist!]!
  }

  type Genre {
    id: ID!
    name: String!
    songs: [Song!]!
  }

  type Song {
    id: ID!
    mix: String!
    album: Album!
    title: String!
    duration: Int!
    discNumber: Int!
    trackNumber: Int!
    genres: [Genre!]!
    artists: [Artist!]!
    remixers: [Artist!]!
    featuring: [Artist!]!
  }

  type User {
    id: ID!
    name: String!
    songs: [Song!]!
    albums: [Album!]!
    genres: [Genre!]!
    nowPlaying: Song!
    artists: [Artist!]!
  }

  type Subscription {
    user(id: ID!): User!
  }
  
`

export default typeDefs
