import { uniqueId, isString } from "lodash"
import { isStringLengthInRange, noopParse } from "../helpers"

const fieldsConfig = [
  {
    id: uniqueId(),
    name: "Name",
    short: "name",
    type: "text",
    isDoc: false,
    init: "Led Zeppelin",
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
        msg: "between 1 and 256 characters.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Photo",
    short: "photo",
    type: "file",
    isDoc: false,
    init: "",
    req: true,
    min: 0,
    max: 16777216,
    parse: {
      in: noopParse,
      out: noopParse,
    },
    validators: [
      {
        id: uniqueId(),
        check: () => true,
        msg: "Is True",
      },
    ],
  },
]

export default fieldsConfig
