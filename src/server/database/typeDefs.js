import gql from "graphql-tag"

const typeDefs = gql`

  type Mutation {
    addArtist(
      name: String!
    ): Artist!
    addLabel(
      name: String!
    ): Label!
    addAlbum(
      title: String!,
      released: Int!,
      label: ID!,
      artists: [ID!]!
    ): Album!
    addSong(
      title: String!,
      mix: String!,
      trackNumber: Int!,
      discNumber: Int!,
      featuring: [ID!]!,
      remixers: [ID!]!,
      artists: [ID!]!,
      genres: [ID!]!,
      album: ID!
    ): Song!
    addGenre(
      name: String!
    ): Genre!
  }

  type Query {
    artists: [Artist!]!
    labels: [Label!]!
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

  type Label {
    id: ID!
    name: String!
    albums: [Album!]!
  }

  type Album {
    id: ID!
    title: String!
    released: Int!
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
    mix: String!
    trackNumber: Int!
    discNumber: Int!
    featuring: [Artist!]!
    remixers: [Artist!]!
    artists: [Artist!]!
    genres: [Genre!]!
    album: Album!
  }
  
`

export default typeDefs
