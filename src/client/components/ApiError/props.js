import { instanceOf } from "prop-types"
import { ApolloError } from "apollo-client"

export const propTypes = {
  error: instanceOf(ApolloError).isRequired,
}
