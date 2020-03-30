/* eslint-disable max-len */
import { uniqueId, isString, isUndefined } from "lodash"
import { isStringLengthInRange, noopParse } from "../helpers"

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
    max: 250000,
    parse: {
      in: noopParse,
      out: noopParse,
    },
    validators: [
      {
        id: uniqueId(),
        msg: "valid file and of type of jpg.",
        check: val => (isUndefined(val.file) ? false : val.file.type === "image/jpeg") && val.file instanceof File,
      },
      {
        id: uniqueId(),
        msg: "size no more than 250 KB",
        check: val => (isUndefined(val.file) ? false : val.file.size < 250000),
      },
    ],
  },
]

export default fieldsConfig