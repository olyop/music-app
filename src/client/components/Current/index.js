import React from "react"

import Song from "../Song"
import QueryApi from "../QueryApi"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.gql"

import "./index.scss"

const bem = reactBem("Current")

const Current = ({ className }) => (
  <div className={bem({ ignore: true, className }, "")}>
    <QueryApi
      query={GET_USER_CURRENT}
      children={
        ({ user }) => (
          <Song
            showAdd
            song={user.current}
          />
        )
      }
    />
  </div>
)

Current.propTypes = propTypes
Current.defaultProps = defaultProps

export default Current
