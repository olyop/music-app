import { uniqueId, isString, isUndefined } from "lodash"
import { isStringLengthInRange, validateArrayOfIds, noopParse } from "../helpers"

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
        msg: "between 1 and 128 characters.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Released",
    short: "released",
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
  {
    id: uniqueId(),
    name: "Artists",
    short: "artistIds",
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
  {
    id: uniqueId(),
    name: "Cover",
    short: "cover",
    type: "file",
    isDoc: false,
    init: "",
    req: true,
    min: 0,
    max: 256000,
    parse: {
      in: noopParse,
      out: noopParse,
    },
    validators: [
      {
        id: uniqueId(),
        msg: "valid file and of type of jpg.",
        check: val =>
          (isUndefined(val.file) ? false : val.file.type === "image/jpeg") &&
          val.file instanceof File,
      },
      {
        id: uniqueId(),
        msg: "size no more than 250 KB",
        check: val => (isUndefined(val.file) ? false : val.file.size < 256000),
      },
    ],
  },
]

export default fieldsConifg
