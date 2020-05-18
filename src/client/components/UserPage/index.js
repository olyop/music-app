import React, { useContext, Fragment } from "react"

import QueryApi from "../QueryApi"
import ListStyleContext from "../../contexts/ListStyle"

import reactBem from "@oly_op/react-bem"

import GET_USER from "../../graphql/queries/getUser.gql"

import "./index.scss"

const bem = reactBem("UserPage")

const UserPage = () => {
  const { listStyle, setListStyle } = useContext(ListStyleContext)
  const handleSelectChange = event => setListStyle(event.target.value)
  return (
    <QueryApi
      query={GET_USER}
      className={bem("", "Padding")}
      children={({ user }) => (
        <Fragment>
          <h1 className={bem("name", "MarginBottom")}>{user.name}</h1>
          <h3 className={bem("option-text")}>List Style</h3>
          <select
            value={listStyle}
            className={bem("select")}
            onChange={handleSelectChange}
          >
            <option
              value="grid"
              children="Grid"
              className={bem("select-option")}
            />
            <option
              value="list"
              children="List"
              className={bem("select-option")}
            />
          </select>
        </Fragment>
      )}
    />
  )
}

export default UserPage
