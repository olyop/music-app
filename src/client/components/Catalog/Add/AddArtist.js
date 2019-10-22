import React from "react"

import Form from "../../Form"

import { Add as bemAdd, AddArtist as bem } from "../../../globals/bem"
import { isStringLengthInRange } from "./helpers"
import { uniqueId, isString } from "lodash"

const fieldsConfig = [
  {
    id: uniqueId(),
    name: "Name",
    short: "name",
    type: "text",
    doc: false,
    init: "",
    req: true,
    min: 0,
    max: 127,
    parse: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        check: isString,
        msg: "data type of string."
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 128),
        msg: "between 1 and 256 characters."
      }
    ]
  }
]

const AddArtist = () => (
  <div className={bem({ ignore: true, className: bemAdd("content") }, "")}>
    <Form
      title="Add Artist"
      fields={fieldsConfig}
    />
  </div>
)

export default AddArtist
