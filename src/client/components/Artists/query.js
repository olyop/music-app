import gql from "graphql-tag"

const query = gql`
  {
    artists {
      id
      name
    }
  }
`

export default query
