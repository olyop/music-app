import gql from "graphql-tag"

const query = gql`
  {
    songs {
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

export default query
