import React, { useContext, Fragment } from "react"

import QueryApi from "../QueryApi"
import ListStyleContext from "../../contexts/ListStyle"

import reactBem from "@oly_op/react-bem"

import GET_USER from "../../graphql/queries/getUser.gql"

import "./index.scss"

const bem = reactBem("UserPage")

const UserPage = () => {
  const { listStyle, setListStyle } = useContext(ListStyleContext)
  return (
    <div className={bem("", "Space")}>
      <QueryApi
        query={GET_USER}
        children={
          ({ user }) => (
            <Fragment>
              <h1 className={bem("name")}>{user.name}</h1>
              <h3 className={bem("option-text")}>List Style</h3>
              <select
                value={listStyle}
                className={bem("select")}
                onChange={event => setListStyle(event.target.value)}
                children={(
                  <Fragment>
                    <option className={bem("select-option")} value="grid">Grid</option>
                    <option className={bem("select-option")} value="list">List</option>
                  </Fragment>
                )}
              />
            </Fragment>
          )
        }
      />
    </div>
  )
}

export default UserPage
