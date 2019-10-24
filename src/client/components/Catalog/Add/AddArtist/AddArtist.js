import React from "react"

import Form from "../../../Form"

import fieldsConfig from "./fieldsConfig"
import reactBEM from "@oly_op/react-bem"

const bem = reactBEM("AddArtist")

const AddArtist = () => (
  <div className={bem("")}>
    <Form
      title="Add Artist"
      fields={fieldsConfig}
    />
  </div>
)

export default AddArtist
