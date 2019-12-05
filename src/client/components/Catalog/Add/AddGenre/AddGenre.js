import React from "react"

import Form from "../../../Form"

import mutation from "./mutation.graphql"
import fieldsConfig from "./fieldsConfig"
import { useMutation } from "@apollo/react-hooks"

const AddGenre = () => {
  const [ addGenre ] = useMutation(mutation)
  return (
    <Form
      title="Add Genre"
      fields={fieldsConfig}
      submit={variables => addGenre({ variables })}
    />
  )
}

export default AddGenre
