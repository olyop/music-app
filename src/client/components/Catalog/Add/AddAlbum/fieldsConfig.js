import {
  isStringLengthInRange,
  deserializeDate,
  validateArray,
  isHex,
  isStringLength
} from "../helpers"

import {
  uniqueId,
  isString
} from "lodash"

import { inRange as curryInRange } from "lodash/fp"

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
    init: Date.now(),
    req: true,
    min: 0,
    max: Date.now(),
    parse: {
      in: Date.parse,
      out: deserializeDate
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
    init: [],
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
        check: validateArray(isString),
        msg: "data type of string."
      },
      {
        id: uniqueId(),
        check: validateArray(isHex),
        msg: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        check: validateArray(isStringLength(24)),
        msg: "all be of length 24."
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
        check: validateArray(isString),
        msg: "data type of string."
      },
      {
        id: uniqueId(),
        check: validateArray(isHex),
        msg: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        check: validateArray(isStringLength(24)),
        msg: "all be of length 24."
      }
    ]
  },
]

export default fieldsConifg
