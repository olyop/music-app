import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import UserContext from "../../contexts/User"

import { useQuery } from "@apollo/react-hooks"
import { filterInLibrary } from "../../helpers"
import { propTypes, defaultProps } from "./props"
import { isUndefined, isEmpty, get } from "lodash"

const QueryApi = ({ query, checkEmpty, variables, library, resultPath, children }) => {

  const userId = useContext(UserContext)
  const { loading, error, data } = useQuery(
    query,
    { variables: { userId, ...variables } },
  )

  if (loading) {
    return <Spinner />
  }

  if (!isUndefined(error)) {
    return null
  }

  const collection = isEmpty(resultPath) ? data : get(data, resultPath)
  const filteredCollection = library ? filterInLibrary(collection) : collection

  if (checkEmpty && isEmpty(filteredCollection)) {
    return <Empty title="This collection is empty." />
  }

  return children(filteredCollection)
}

QueryApi.propTypes = propTypes
QueryApi.defaultProps = defaultProps

export default QueryApi
