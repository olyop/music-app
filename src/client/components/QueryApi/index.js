import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserContext from "../../contexts/User"

import { useQuery } from "@apollo/react-hooks"
import { filterInLibrary } from "../../helpers"
import { propTypes, defaultProps } from "./props"
import { isUndefined, isEmpty, isNull, get } from "lodash"

const QueryApi = ({
  query,
  library,
  spinner,
  children,
  variables,
  className,
  checkEmpty,
  resultPath,
  spinnerClassName,
}) => {

  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    query,
    { variables: { userId, ...variables } },
  )

  if (spinner && loading) {
    return <Spinner className={spinnerClassName} />
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  const collection = isEmpty(resultPath) ? data : get(data, resultPath)
  const filteredCollection = library ? filterInLibrary(collection) : collection

  if (checkEmpty && isEmpty(filteredCollection)) {
    return <Empty title="This collection is empty." />
  }

  if (!isNull(className)) {
    return <div className={className}>{children(filteredCollection)}</div>
  } else {
    return children(filteredCollection)
  }
}

QueryApi.propTypes = propTypes
QueryApi.defaultProps = defaultProps

export default QueryApi
