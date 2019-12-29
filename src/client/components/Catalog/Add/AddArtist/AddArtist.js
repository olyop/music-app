import React from "react"

import Form from "../../../Form"

import mutation from "./mutation.graphql"
import fieldsConfig from "./fieldsConfig"
import { useMutation } from "@apollo/react-hooks"

const AddArtist = () => {
  const [ addArtist ] = useMutation(mutation)
  return (
    <Form
      title="Add Artist"
      fields={fieldsConfig}
      submit={variables => addArtist({ variables })}
    />
  )
}

export default AddArtist
