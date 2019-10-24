import React from "react"

import ApiError from "../../../ApiError"
import Loading from "../../../Loading"
import { Query } from "react-apollo"
// import Form from "../../../Form"

import fieldsConifg from "./fieldsConfig"
import reactBEM from "@oly_op/react-bem"
import { isUndefined } from "lodash"
import query from "./query.graphql"

const bem = reactBEM("AddAlbum")

const AddAlbum = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {  
        if (loading) return <Loading/>  
        if (!isUndefined(error)) return <ApiError/>
        console.log(fieldsConifg(data))
        return (
          "foo"
        )
      }}
    </Query>
  </div>
)

/* <Form
            title="Add Album"
            fields={fieldsConifg(artistsOrdered)}
          /> */

export default AddAlbum
