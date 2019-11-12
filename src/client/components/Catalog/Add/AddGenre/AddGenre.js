import React from "react"

import Form from "../../../Form"

import fieldsConfig from "./fieldsConfig"
import reactBem from "@oly_op/react-bem"

const bem = reactBem("AddGenre")

const AddGenre = () => (
  <div className={bem("")}>
    <Form
      title="Add Genre"
      fields={fieldsConfig}
    />
  </div>
)

export default AddGenre
