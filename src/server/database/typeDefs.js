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
    addUserSong(
      userId: ID!
      songId: ID!
    ): User!
    removeUserSong(
      userId: ID!
      songId: ID!
    ): User!
    addUserAlbum(
      userId: ID!
      albumId: ID!
    ): User!
    removeUserAlbum(
      userId: ID!
      albumId: ID!
    ): User!
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
    addPlaylist(
      name: String!
      songs: [ID!]!
    ): Playlist!
  }

  type Query {
    songs: [Song!]!
    users: [User!]!
    albums: [Album!]!
    genres: [Genre!]!
    artists: [Artist!]!
    libraries: [Library!]!
    playlists: [Playlist!]!
    librarySongs: [LibrarySong!]!
    song(id: ID!): Song!
    user(id: ID!): User!
    album(id: ID!): Album!
    genre(id: ID!): Genre!
    artist(id: ID!): Artist!
    library(id: ID!): Library!
    playlist(id: ID!): Playlist!
    librarySong(id: ID!): LibrarySong!
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

  type Playlist {
    id: ID!
    name: String!
    songs: [Song!]!
  }

  type LibrarySong {
    id: ID!
    song: Song!
    plays: Int!
    library: Library!
  }
  
  type Library {
    id: ID!
    user: User!
    songs: [LibrarySong!]!
  }

  type User {
    id: ID!
    name: String!
    library: Library!
    nowPlaying: Song!
  }
  
`

export default typeDefs
