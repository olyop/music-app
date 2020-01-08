import React from "react"

import Form from "../../../Form"
import Loading from "../../../Loading"
import ApiError from "../../../ApiError"

import { isUndefined } from "lodash"
import fieldsConfig from "./fieldsConfig"
import ADD_SONG from "../../../../graphql/addSong.graphql"
import { useQuery, useMutation } from "@apollo/react-hooks"
import GET_ADD_SONG from "../../../../graphql/getAddSong.graphql"

const AddSong = () => {
  const [ addSong ] = useMutation(ADD_SONG)
  const { loading, error, data } = useQuery(GET_ADD_SONG)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    return (
      <Form
        title="Add Song"
        fields={fieldsConfig(data)}
        submit={variables => addSong({ variables })}
      />
    )
  }
}

export default AddSong
