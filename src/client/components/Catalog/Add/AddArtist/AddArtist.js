import React from "react"

import Form from "../../../Form"

import fieldsConfig from "./fieldsConfig"
import reactBem from "@oly_op/react-bem"

const bem = reactBem("AddArtist")

const AddArtist = () => (
  <div className={bem("")}>
    <Form
      title="Add Artist"
      fields={fieldsConfig}
    />
  </div>
)

export default AddArtist
