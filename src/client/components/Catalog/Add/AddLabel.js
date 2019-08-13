import React from "react"

import Form from "../../Form"

import { Add as bemAdd, AddLabel as bem } from "../../../globals/bem"
import { label as formConfig } from "./formConfigs"

const AddLabel = () => {
  return (
    <div className={bem({ ignore: true, className: bemAdd("content") }, "")}>
      <Form
        title="Add Label"
        fields={formConfig}
      />
    </div>
  )
}

export default AddLabel
