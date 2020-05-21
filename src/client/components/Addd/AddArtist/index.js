import React from "react"

import Form from "../../Form"

import fieldsConfig from "./fieldsConfig"
import { useMutation } from "@apollo/react-hooks"

import ADD_ARTIST from "../../../graphql/mutations/addArtist.gql"

const AddArtist = () => {
  const [ addArtist, addArtistResult ] = useMutation(ADD_ARTIST)
  return (
    <Form
      title="Artist"
      fields={fieldsConfig}
      result={addArtistResult}
      submit={variables => addArtist({ variables })}
    />
  )
}

export default AddArtist
