import React from "react"

import Form from "../../Form"

import { Add as bemAdd, AddArtist as bem } from "../../../globals/bem"
import { artist as formConfig } from "./formConfigs"

const AddArtist = () => {
  return (
    <div className={bem({ ignore: true, className: bemAdd("content") }, "")}>
      <Form
        title="Add Artist"
        fields={formConfig}
      />
    </div>
  )
}

export default AddArtist
