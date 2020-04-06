import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserContext from "../../contexts/User"

import { propTypes } from "./props"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { filterInLibrary } from "../../helpers"

const QueryApi = ({ query, collectionName, children }) => {

  const userId = useContext(UserContext)
  const { loading, error, data } = useQuery(query, { variables: { userId } })

  if (loading) {
    return <Spinner />
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  const collection = filterInLibrary(data.user[collectionName])

  if (isEmpty(collection)) {
    return <Empty title="This collection is empty." />
  }

  return children(collection)
}

QueryApi.propTypes = propTypes

export default QueryApi
