import React from "react"

import Form from "../../../Form"

import fieldsConfig from "./fieldsConfig"
import { useMutation } from "@apollo/react-hooks"
import ADD_GENRE from "../../../../graphql/addGenre.graphql"

const AddGenre = () => {
  const [ addGenre ] = useMutation(ADD_GENRE)
  return (
    <Form
      title="Add Genre"
      fields={fieldsConfig}
      submit={variables => addGenre({ variables })}
    />
  )
}

export default AddGenre
