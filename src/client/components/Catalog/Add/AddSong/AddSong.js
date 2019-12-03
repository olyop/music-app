import React from "react"

import Form from "../../../Form"
import Loading from "../../../Loading"
import ApiError from "../../../ApiError"

import query from "./query.graphql"
import { isUndefined } from "lodash"
import mutation from "./mutation.graphql"
import fieldsConfig from "./fieldsConfig"
import { useQuery, useMutation } from "@apollo/react-hooks"

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
        fields={fieldsConfig(data)}
        submitFunc={variables => addSong({ variables })}
      />
    )
  }
}

export default AddSong
