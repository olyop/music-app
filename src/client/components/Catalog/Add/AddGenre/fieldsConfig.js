import { isString, uniqueId } from "lodash"
import { isStringLengthInRange } from "../helpers"

const fieldsConfig = [
  {
    id: uniqueId(),
    name: "Name",
    short: "name",
    type: "text",
    isDoc: false,
    init: "",
    req: true,
    min: 0,
    max: 127,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: isString,
        msg: "data type of string.",
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 128),
        msg: "between 1 and 128 characters.",
      },
    ],
  },
]

export default fieldsConfig
