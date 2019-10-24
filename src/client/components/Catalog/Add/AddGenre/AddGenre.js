import React from "react"

import Form from "../../../Form"

import { Add as bemAdd, AddGenre as bem } from "../../../../globals/bem"
import { isStringLengthInRange } from "../helpers"
import { isString, uniqueId } from "lodash"

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
        msg: "between 1 and 128 characters."
      }
    ]
  }
]

const AddGenre = () => (
  <div className={bem({ ignore: true, className: bemAdd("content") }, "")}>
    <Form
      title="Add Genre"
      fields={fieldsConfig}
    />
  </div>
)

export default AddGenre
