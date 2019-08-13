import React from "react"

import Form from "../../Form"

import { Add as bemAdd, AddGenre as bem } from "../../../globals/bem"
import { genre as formConfig } from "./formConfigs"

const AddGenre = () => {
  return (
    <div className={bem({ ignore: true, className: bemAdd("content") }, "")}>
      <Form
        title="Add Genre"
        fields={formConfig}
      />
    </div>
  )
}

export default AddGenre
