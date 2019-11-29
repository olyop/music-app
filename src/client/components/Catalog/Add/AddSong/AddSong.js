import React from "react"

import Form from "../../../Form"
import Loading from "../../../Loading"
import ApiError from "../../../ApiError"
import { useQuery, useMutation } from "@apollo/react-hooks"

import query from "./query.graphql"
import { isUndefined } from "lodash"
import mutation from "./mutation.graphql"
import fieldsConfig from "./fieldsConfig"

const AddSong = () => {
  const [ addSong ] = useMutation(mutation)
  const { loading, error, data } = useQuery(query)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    return (
      <Form
        title="Add Song"
        submitFunc={addSong}
        fields={fieldsConfig(data)}
      />
    )
  }
}

export default AddSong
