import React from "react"

import ApiError from "../../../ApiError"
import Loading from "../../../Loading"
import { Query } from "react-apollo"
// import Form from "../../../Form"

import fieldsConfig from "./fieldsConfig"
import reactBEM from "@oly_op/react-bem"
import { isUndefined } from "lodash"
import query from "./query.graphql"

const bem = reactBEM("AddSong")

const AddSong = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {  
        if (loading) return <Loading/>  
        if (!isUndefined(error)) return <ApiError/>
        console.log(fieldsConfig(data))
        return (
          "foo"
        )
      }}
    </Query>
  </div>
)

/* <Form
      title="Add Song"
      fields={fieldsConfig}
    /> */

export default AddSong
