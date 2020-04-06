import React, { useContext } from "react"

import Song from "../Song"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserContext from "../../contexts/User"

import reactBem from "@oly_op/react-bem"
import { isUndefined, isNull } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"

import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.graphql"

import "./Current.scss"

const bem = reactBem("Current")

const Current = ({ className }) => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_USER_CURRENT,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  if (isNull(data.user.current)) {
    return null
  }

  return (
    <Song
      showAdd
      song={data.user.current}
      className={bem({ ignore: true, className }, "")}
    />
  )
}

Current.propTypes = propTypes
Current.defaultProps = defaultProps

export default Current
