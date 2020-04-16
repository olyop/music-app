import React from "react"

import Form from "../../Form"
import QueryApi from "../../QueryApi"

import fieldsConfig from "./fieldsConfig"
import { useMutation } from "@apollo/react-hooks"

import ADD_ALBUM from "../../../graphql/mutations/addAlbum.graphql"
import GET_ADD_ALBUM from "../../../graphql/queries/getAddAlbum.graphql"

const AddAlbum = () => {
  const [ addAlbum, addAlbumResult ] = useMutation(ADD_ALBUM)
  return (
    <QueryApi
      query={GET_ADD_ALBUM}
      children={
        data => (
          <Form
            title="Album"
            result={addAlbumResult}
            fields={fieldsConfig(data)}
            submit={variables => addAlbum({ variables })}
          />
        )
      }
    />
  )
}

export default AddAlbum
