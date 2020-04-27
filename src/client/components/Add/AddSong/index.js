import React from "react"

import Form from "../../Form"
import Spinner from "../../Spinner"

import { isUndefined } from "lodash"
import fieldsConfig from "./fieldsConfig"
import { useQuery, useMutation } from "@apollo/react-hooks"

import ADD_SONG from "../../../graphql/mutations/addSong.graphql"
import GET_ADD_SONG from "../../../graphql/queries/getAddSong.graphql"

const AddSong = () => {
  const { loading, error, data } = useQuery(GET_ADD_SONG)
  const [ addSong, addSongResult ] = useMutation(ADD_SONG)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return null
  } else {
    return (
      <Form
        title="Song"
        result={addSongResult}
        fields={fieldsConfig(data)}
        submit={variables => addSong({ variables })}
      />
    )
  }
}

export default AddSong
