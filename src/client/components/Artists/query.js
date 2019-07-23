import gql from "graphql-tag"

const query = gql`
  {
    artists {
      key
      name
    }
  }
`

export default query
