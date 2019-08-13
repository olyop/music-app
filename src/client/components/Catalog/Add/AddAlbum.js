import React from "react"

import Form from "../../Form"

import { Add as bemAdd, AddSong as bem } from "../../../globals/bem"
import { album as formConfig } from "./formConfigs"

const AddAlbum = () => {
  return (
    <div className={bem({ ignore: true, className: bemAdd("content") }, "")}>
      <Form
        title="Add Album"
        fields={formConfig}
      />
    </div>
  )
}

export default AddAlbum
