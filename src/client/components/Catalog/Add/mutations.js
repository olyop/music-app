import gql from "graphql-tag"

export const addArtistMutation = gql`
  mutation addArtist($name: String!) {
    addArtist(name: $name) {
      id
      name
    }
  }
`

export const addAlbumMutation = gql`
  mutation addAlbum(
    $title: String!,
    $year: Int!,
    $artist: ID!
  ) {
    addAlbum(
      title: $title,
      year: $year,
      artist: $artist
    ) {
      id
      title
      year
      artist {
        id
        name
      }
    }
  }
`

export const addSongMutation = gql`
  mutation addSong(
    $title: String!,
    $trackNumber: Int!,
    $artist: ID!,
    $album: ID!
  ) {
    addSong(
      title: $title,
      trackNumber: $trackNumber,
      artist: $artist,
      album: $album
    ) {
      id
      title
      artist {
        id
        name
      }
      album {
        id
        title
      }
    }
  }
`
