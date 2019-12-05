import { inRange as curryInRange } from "lodash/fp"
import { uniqueId, isString, isSafeInteger } from "lodash"
import { isStringLengthInRange, validateArrayOfIds } from "../helpers"

const noopReturn = x => x

const fieldsConifg = ({ artists }) => [
  {
    id: uniqueId(),
    name: "Title",
    short: "title",
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
        msg: "between 1 and 256 characters.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Released",
    short: "released",
    type: "int",
    isDoc: false,
    init: Date.now(),
    req: true,
    min: 0,
    max: Date.now(),
    parse: {
      in: noopReturn,
      out: noopReturn,
    },
    validators: [
      {
        id: uniqueId(),
        check: x => isSafeInteger(x) && curryInRange(1, Infinity)(x),
        msg: "a valid integer.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Artists",
    short: "artists",
    type: "list",
    isDoc: true,
    db: artists,
    init: [],
    req: true,
    min: 0,
    max: 24,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: validateArrayOfIds,
        msg: "Must be a valid artists.",
      },
    ],
  },
]

export default fieldsConifg
