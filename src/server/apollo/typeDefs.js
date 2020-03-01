import gql from "graphql-tag"

const typeDefs = gql`

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

  type Playlist {
    id: ID!
    name: String!
    songs: [Song!]!
  }

  type Play {
    id: ID!
    user: User!
    song: Song!
  }

  type UserSong {
    id: ID!
    user: User!
    song: Song!
    plays: [Play!]!
    numOfPlays: Int!
    inLibrary: Boolean!
  }

  type UserAlbum {
    id: ID!
    user: User!
    album: Album!
    inLibrary: Boolean!
  }

  type User {
    id: ID!
    name: String!
    prev: [Song!]!
    next: [Song!]!
    queue: [Song!]!
    plays: [Play!]!
    nowPlaying: Song!
    songs: [UserSong!]!
    albums: [UserAlbum!]!
    playlists: [Playlist!]!
  }

  type Mutation {
    updateNowPlaying(
      userId: ID!
      songId: ID!
    ): User!
    addUserSong(
      userId: ID!
      songId: ID!
    ): Song!
    addUserAlbum(
      userId: ID!
      albumId: ID!
    ): Song!
    removeUserSong(
      userId: ID!
      songId: ID!
    ): Song!
    removeUserAlbum(
      userId: ID!
      albumId: ID!
    ): Song!
    addArtist(
      name: String!
    ): Artist!
    addGenre(
      name: String!
    ): Genre!
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
      artists: [ID!]!
      discNumber: Int!
      remixers: [ID!]!
      duration: String!
      trackNumber: Int!
      featuring: [ID!]!
    ): Song!
    addPlaylist(
      user: ID!
      name: String!
      songs: [ID!]!
    ): Playlist!
  }

  type Query {
    songs: [Song!]!
    albums: [Album!]!
    genres: [Genre!]!
    artists: [Artist!]!
    song(id: ID!): Song!
    user(id: ID!): User!
    album(id: ID!): Album!
    genre(id: ID!): Genre!
    artist(id: ID!): Artist!
  }
  
`

export default typeDefs
