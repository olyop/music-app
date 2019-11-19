import React from "react"

import ApiError from "../../../ApiError"
import Loading from "../../../Loading"
import { Query } from "react-apollo"
import Form from "../../../Form"

import fieldsConfig from "./fieldsConfig"
import reactBem from "@oly_op/react-bem"
import { isUndefined } from "lodash"
import query from "./query.graphql"

const bem = reactBem("AddSong")

const AddSong = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {  
        if (loading) {
          return <Loading/>
        } else if (!isUndefined(error)) {
          return <ApiError/>
        } else {
          return (
            <Form
              title="Add Song"
              fields={fieldsConfig(data)}
            />
          )
        }
      }}
    </Query>
  </div>
)

export default AddSong
