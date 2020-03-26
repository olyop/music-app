import React from "react"

import Form from "../../Form"

import fieldsConfig from "./fieldsConfig"
import { useMutation } from "@apollo/react-hooks"

import ADD_ARTIST from "../../../graphql/mutations/addArtist.graphql"

const AddArtist = () => {
  const [ addArtist ] = useMutation(ADD_ARTIST)
  return (
    <Form
      title="Artist"
      fields={fieldsConfig}
      submit={variables => addArtist({ variables })}
    />
  )
}

export default AddArtist
