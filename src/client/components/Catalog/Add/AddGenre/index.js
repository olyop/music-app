import React from "react"

import Form from "../../../Form"

import fieldsConfig from "./fieldsConfig"
import { useMutation } from "@apollo/react-hooks"

import ADD_GENRE from "../../../../graphql/mutations/addGenre.graphql"

const AddGenre = () => {
  const [ addGenre, addGenreResult ] = useMutation(ADD_GENRE)
  return (
    <Form
      title="Genre"
      fields={fieldsConfig}
      result={addGenreResult}
      submit={variables => addGenre({ variables })}
    />
  )
}

export default AddGenre
