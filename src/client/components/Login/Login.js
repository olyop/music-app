import React from "react"

import App from "../App"
import Loading from "../Loading"
import ApiError from "../ApiError"

import query from "./query.graphql"
import { isUndefined } from "lodash"
import { useQuery } from "@apollo/react-hooks"

const id = "5dfacf7d106b6402ac9d3375"

const Login = () => {
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(query, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    return <App user={data.user} />
  }
}

export default Login
