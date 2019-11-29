import React from "react"

import Form from "../../../Form"
import Loading from "../../../Loading"
import ApiError from "../../../ApiError"
import { useQuery } from "@apollo/react-hooks"

import query from "./query.graphql"
import { isUndefined } from "lodash"
import fieldsConifg from "./fieldsConfig"

const AddAlbum = () => {
  const { loading, error, data } = useQuery(query)
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
}

export default AddAlbum
