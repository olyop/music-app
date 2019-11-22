import {
  validateId,
  isNotEmpty,
  validateArrayOfIds,
  isStringLengthInRange,
} from "../helpers"

import {
  uniqueId,
  isString,
  toInteger,
  isSafeInteger,
} from "lodash"

import {
  inRange as curryInRange,
} from "lodash/fp"

const fieldsConifg = ({ artists, albums, genres }) => [
  {
    id: uniqueId(),
    name: "Title",
    short: "title",
    type: "text",
    isDoc: false,
    init: "",
    req: true,
    min: 1,
    max: 128,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: isNotEmpty,
        msg: "not empty.",
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
    name: "Mix",
    short: "mix",
    type: "text",
    isDoc: false,
    init: "",
    req: true,
    min: 0,
    max: 64,
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
        check: isStringLengthInRange(1, 64),
        msg: "between 1 and 64 characters.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Track Number",
    short: "trackNumber",
    type: "int",
    isDoc: false,
    init: 1,
    req: true,
    min: 1,
    max: 32,
    parse: {
      in: toInteger,
      out: toInteger,
    },
    validators: [
      {
        id: uniqueId(),
        check: isSafeInteger,
        msg: "a valid integer.",
      },
      {
        id: uniqueId(),
        check: curryInRange(1, 32),
        msg: "between 1 and 32.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Disc Number",
    short: "discNumber",
    type: "int",
    isDoc: false,
    init: 1,
    req: true,
    min: 1,
    max: 32,
    parse: {
      in: toInteger,
      out: toInteger,
    },
    validators: [
      {
        id: uniqueId(),
        check: isSafeInteger,
        msg: "a valid integer.",
      },
      {
        id: uniqueId(),
        check: curryInRange(1, 32),
        msg: "between 1 and 32.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Featuring",
    short: "featuring",
    type: "list",
    isDoc: true,
    db: artists,
    init: [],
    req: false,
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
        msg: "must be valid artists.",
      },
    ],
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
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: validateArrayOfIds,
        msg: "must be valid artists.",
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
        msg: "must be valid artists.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Genres",
    short: "genres",
    type: "list",
    isDoc: true,
    db: genres,
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
        msg: "must be valid genres.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Album",
    short: "album",
    type: "text",
    isDoc: true,
    db: albums,
    init: "",
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
        check: validateId,
        msg: "must be a valid album.",
      },
    ],
  },
]

export default fieldsConifg
