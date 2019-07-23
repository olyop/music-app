import gql from "graphql-tag"

const query = gql`
  {
    songs {
      key
      title
      trackNumber
      artistKey
      albumKey
    }
    albums {
      key
      title
    }
    artists {
      key
      name
    }
  }
`

export default query
