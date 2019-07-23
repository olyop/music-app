import gql from "graphql-tag"

const query = gql`
  {
    albums {
      key
      title
      year
      artistKey
    }
    artists {
      key
      name
    }
  }
`

export default query
