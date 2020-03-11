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

  type UserArtist {
    id: ID!
    user: User!
    artist: Artist!
    numOfPlays: Int!
    inLibrary: Boolean!
  }
  
  type UserAlbum {
    id: ID!
    user: User!
    album: Album!
    numOfPlays: Int!
    inLibrary: Boolean!
  }

  type UserSong {
    id: ID!
    user: User!
    song: Song!
    plays: [Play!]!
    numOfPlays: Int!
    inLibrary: Boolean!
  }

  type User {
    id: ID!
    name: String!
    prev: [Song!]!
    next: [Song!]!
    later: [Song!]!
    plays: [Play!]!
    nowPlaying: Song!
    songs: [UserSong!]!
    albums: [UserAlbum!]!
    artists: [UserArtist!]!
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
    ): Album!
    addUserArtist(
      userId: ID!
      artistId: ID!
    ): Artist!

    removeUserSong(
      userId: ID!
      songId: ID!
    ): Song!
    removeUserAlbum(
      userId: ID!
      albumId: ID!
    ): Song!
    removeUserArtist(
      userId: ID!
      artistId: ID!
    ): Song!

    addArtist(
      name: String!
      photo: Upload!
    ): Artist!
    addGenre(
      name: String!
    ): Genre!
    addAlbum(
      title: String!
      released: Int!
      cover: Upload!
      artists: [ID!]!
    ): Album!
    addSong(
      album: ID!
      mix: String!
      genres: [ID!]!
      title: String!
      audio: Upload!
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
    user(id: ID!): User!
    song(id: ID!): Song!
    album(id: ID!): Album!
    genre(id: ID!): Genre!
    artist(id: ID!): Artist!
  }
  
`

export default typeDefs
