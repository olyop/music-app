import gql from "graphql-tag"

const query = gql`
  {
    albums {
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

export default query
