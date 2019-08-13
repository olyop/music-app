import React from "react"

import Form from "../../Form"

import { Add as bemAdd, AddSong as bem } from "../../../globals/bem"
import { song as formConfig } from "./formConfigs"

const AddSong = () => {
  return (
    <div className={bem({ ignore: true, className: bemAdd("content") }, "")}>
      <Form
        title="Add Song"
        fields={formConfig}
      />
    </div>
  )
}

export default AddSong
