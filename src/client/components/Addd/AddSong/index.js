import React from "react"

import Form from "../../Form"
import QueryApi from "../../QueryApi"

import fieldsConfig from "./fieldsConfig"
import { useMutation } from "@apollo/react-hooks"

import ADD_SONG from "../../../graphql/mutations/addSong.gql"
import GET_ADD_SONG from "../../../graphql/queries/getAddSong.gql"

const AddSong = () => {
  const [ addSong, addSongResult ] = useMutation(ADD_SONG)
  return (
    <QueryApi
      query={GET_ADD_SONG}
      children={
        data => (
          <Form
            title="Song"
            result={addSongResult}
            fields={fieldsConfig(data)}
            submit={variables => addSong({ variables })}
          />
        )
      }
    />
  )
}

export default AddSong
