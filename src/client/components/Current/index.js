import React from "react"

import Song from "../Song"
import QueryApi from "../QueryApi"

import isNull from "lodash/isNull.js"
import { propTypes, defaultProps } from "./props"

import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.gql"

const Current = ({ className }) => (
  <div className={className}>
    <QueryApi
      query={GET_USER_CURRENT}
      children={({ user }) => (
        isNull(user.current) ? null : (
          <Song showAdd song={user.current} />
        )
      )}
    />
  </div>
)

Current.propTypes = propTypes
Current.defaultProps = defaultProps

export default Current
