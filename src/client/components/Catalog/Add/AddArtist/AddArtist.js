import React from "react"

import Form from "../../../Form"

import { isUndefined } from "lodash"
import mutation from "./mutation.graphql"
import fieldsConfig from "./fieldsConfig"
import { useMutation } from "@apollo/react-hooks"
import { copyToClipboard } from "../../../../helpers/misc"

const AddArtist = () => {
  const [ addArtist, { data } ] = useMutation(mutation)
  const submit = variables => addArtist({ variables })
  if (!isUndefined(data)) copyToClipboard(data.addArtist.id)
  return (
    <Form
      submit={submit}
      title="Add Artist"
      fields={fieldsConfig}
    />
  )
}

export default AddArtist
