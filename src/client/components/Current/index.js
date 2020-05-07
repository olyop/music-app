import React from "react"

import Song from "../Song"
import QueryApi from "../QueryApi"

import { isNull } from "lodash"
import { propTypes, defaultProps } from "./props"

import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.gql"

const Current = ({ className }) => (
  <QueryApi
    query={GET_USER_CURRENT}
    children={({ user }) => (isNull(user.current) ? null : (
      <Song
        song={user.current}
        className={className}
      />
    ))}
  />
)

Current.propTypes = propTypes
Current.defaultProps = defaultProps

export default Current
