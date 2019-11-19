import { isStringLengthInRange, validateArrayOfIds } from "../helpers"
import { inRange as curryInRange } from "lodash/fp"
import { uniqueId, isString } from "lodash"

const noopReturn = x => x

const fieldsConifg = ({ artists }) => [
  {
    id: uniqueId(),
    name: "Title",
    short: "title",
    type: "text",
    isDoc: false,
    init: "Fever",
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
  },
  {
    id: uniqueId(),
    name: "Released",
    short: "released",
    type: "date",
    isDoc: false,
    // init: Date.now(),
    init: 1553817600,
    req: true,
    min: 0,
    max: Date.now(),
    parse: {
      in: noopReturn,
      out: noopReturn
    },
    validators: [
      {
        id: uniqueId(),
        check: curryInRange(0, Date.now()),
        msg: "valid date."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Artists",
    short: "artists",
    type: "list",
    isDoc: true,
    db: artists,
    init: ["5dae5e92c3f0c42c325a8793", "5dd0028692d31103a85222fa"],
    req: true,
    min: 0,
    max: 24,
    parse: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        check: validateArrayOfIds,
        msg: "Must be a valid artists."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Remixers",
    short: "remixers",
    type: "list",
    isDoc: true,
    db: artists,
    init: [],
    req: false,
    min: 0,
    max: 24,
    parse: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        check: validateArrayOfIds,
        msg: "Must be a valid artists."
      }
    ]
  },
]

export default fieldsConifg
