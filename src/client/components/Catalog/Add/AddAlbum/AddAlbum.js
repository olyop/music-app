import React from "react"

import Form from "../../../Form"
import { Query } from "react-apollo"
import Loading from "../../../Loading"
import ApiError from "../../../ApiError"

import query from "./query.graphql"
import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import fieldsConifg from "./fieldsConfig"

const bem = reactBem("AddAlbum")

const AddAlbum = () => (
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
              title="Add Album"
              fields={fieldsConifg(data)}
            />
          )
        }
      }}
    </Query>
  </div>
)

export default AddAlbum
